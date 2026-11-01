const fs = require('fs');
const path = require('path');

async function fetchWithRetry(url, options, retries = 4, delayMs = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      if ([502, 503, 504, 429].includes(res.status) && attempt < retries) {
        console.warn(`[Attempt ${attempt}/${retries}] GitHub API HTTP ${res.status}. Retrying in ${delayMs / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2;
        continue;
      }
      return res;
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`[Attempt ${attempt}/${retries}] Network request failed: ${err.message}. Retrying...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs *= 2;
    }
  }
}

async function updateData() {
  const token = process.env.GITHUB_TOKEN; if (!token) { console.error('GITHUB_TOKEN not set'); process.exit(1); }
  const query = `{
    user(login: "Govind-Madhav") {
      contributionsCollection {
        totalCommitContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }`;

  try {
    const res = await fetchWithRetry('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js-GitHub-Stats-Fetcher'
      },
      body: JSON.stringify({ query })
    });

    if (!res || !res.ok) {
      console.warn(`GitHub GraphQL API returned status ${res?.status ?? 'unknown'}; keeping fallback data.`);
      return;
    }

    const data = await res.json();
    if (!data.data?.user) {
      console.error('GraphQL errors:', data.errors);
      return;
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;
    const total = calendar.totalContributions;

    const weeks = calendar.weeks.map(w =>
      w.contributionDays.map(d => {
        let level = 0;
        if (d.contributionCount > 0) level = 1;
        if (d.contributionCount > 3) level = 2;
        if (d.contributionCount > 6) level = 3;
        if (d.contributionCount > 10) level = 4;
        return {
          date: d.date,
          count: d.contributionCount,
          level
        };
      })
    );

    const output = {
      username: "Govind-Madhav",
      total: total,
      generatedAt: new Date().toISOString().split('T')[0],
      weeks: weeks
    };

    const targetPath = path.join(process.cwd(), 'data', 'github-contributions.json');
    fs.writeFileSync(targetPath, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`Successfully updated data/github-contributions.json with ${total} total contributions via GITHUB_TOKEN!`);
  } catch (err) {
    console.error('Failed to fetch via GITHUB_TOKEN:', err);
  }
}

updateData();
