// Build-time GitHub contributions prefetch.
//
// The site is a static export (next.config.ts → output: 'export'), so there is
// no server at runtime to call the GitHub API. This script runs at build time
// (wired as `prebuild` in package.json), fetches the public no-auth contribution
// API, transforms the flat daily list into a GitHub-style week-column grid, and
// writes data/github-contributions.json — which the Contributions component reads.
//
// It is intentionally TOLERANT: any failure falls back to the already-committed
// JSON (or a minimal empty grid) and exits 0, so CI / deploy builds never break
// on an API hiccup. Run standalone with `npm run contrib`.

import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const USERNAME = 'govind-madhav';
const API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'data', 'github-contributions.json');

// YYYY-MM-DD for `generatedAt` without pulling a date lib.
function today() {
  return new Date().toISOString().slice(0, 10);
}

// Merge fetched days with existing committed days so recent/backdated contributions are preserved
function mergeContributions(fetchedDays, existingWeeks) {
  const existingMap = new Map();
  if (Array.isArray(existingWeeks)) {
    existingWeeks.forEach((week) => {
      if (Array.isArray(week)) {
        week.forEach((day) => {
          if (day && day.date) {
            existingMap.set(day.date, day);
          }
        });
      }
    });
  }

  return fetchedDays.map((day) => {
    const existing = existingMap.get(day.date);
    if (existing && existing.count > 0 && (day.count === 0 || !day.count)) {
      return { date: day.date, count: existing.count, level: existing.level };
    }
    return day;
  });
}

// Bucket the flat, chronological daily list into GitHub-style week columns:
// each column is a Sun→Sat week. Pad the first column's leading days and the
// last column's trailing days with null so the grid has clean empty corners.
function toWeeks(contributions) {
  const weeks = [];
  let week = [];
  for (const day of contributions) {
    const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay(); // 0 = Sun
    if (weekday === 0 && week.length > 0) {
      weeks.push(week);
      week = [];
    }
    // Pad the very first column up to the first day's weekday.
    if (weeks.length === 0 && week.length === 0 && weekday > 0) {
      for (let i = 0; i < weekday; i += 1) week.push(null);
    }
    week.push({ date: day.date, count: day.count, level: day.level });
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null); // pad the last column
    weeks.push(week);
  }
  return weeks;
}

function emptyGrid() {
  const weeks = Array.from({ length: 53 }, () =>
    Array.from({ length: 7 }, () => null),
  );
  return { username: USERNAME, total: 0, generatedAt: today(), weeks };
}

async function main() {
  try {
    let existingData = null;
    if (existsSync(OUT)) {
      try {
        const raw = await readFile(OUT, 'utf8');
        existingData = JSON.parse(raw);
      } catch {
        // ignore parse error
      }
    }

    const res = await fetch(API, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    let rawContributions = Array.isArray(json.contributions) ? json.contributions : [];
    if (rawContributions.length === 0) throw new Error('no contributions in response');

    // Merge to prevent 3rd-party proxy cache delays from overriding existing recent daily counts
    const contributions = mergeContributions(rawContributions, existingData?.weeks);

    const total = contributions.reduce((sum, d) => sum + (d.count || 0), 0);

    const out = {
      username: USERNAME,
      total: Math.max(total, existingData?.total || 0),
      generatedAt: today(),
      weeks: toWeeks(contributions),
    };

    await writeFile(OUT, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
    console.log(
      `✓ contributions: ${out.total} total, ${out.weeks.length} weeks → data/github-contributions.json`,
    );
  } catch (err) {
    if (existsSync(OUT)) {
      // Keep the committed data — the build reads that.
      console.warn(
        `⚠ contributions fetch failed (${err.message}); keeping existing data/github-contributions.json`,
      );
    } else {
      await writeFile(OUT, `${JSON.stringify(emptyGrid(), null, 2)}\n`, 'utf8');
      console.warn(
        `⚠ contributions fetch failed (${err.message}); wrote empty fallback grid`,
      );
    }
  }
}

await main();
