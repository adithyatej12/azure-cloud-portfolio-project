"use client";

/* ABOUT PAGE · Contributions — Official GitHub Heatmap layout + snake animation. */

import { useRef, useMemo, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import githubContributions from "@/data/github-contributions.json";
import styles from "./Contributions.module.css";

const LEFT_OFFSET = 36;
const TOP_OFFSET = 22;
const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const ROWS = 7;

const TAIL = 8;
const SEG_GAP = 1;
const SECS_PER_CELL = 0.125;
const headOpacity = (k: number) => Math.max(0.18, 1 - k * 0.1);

const CYCLE_PAUSE = 1.1;
const LEAD_IN = 0.7;

const LEVELS = [0, 1, 2, 3, 4] as const;

type Pt = { col: number; row: number };

export default function Contributions() {
  const reduced = useReducedMotion();
  const [weeksData, setWeeksData] = useState<any[][]>(githubContributions.weeks);
  const [totalCount, setTotalCount] = useState<number>(githubContributions.total);

  useEffect(() => {
    fetch("/api/github-stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.weeks && Array.isArray(data.weeks) && data.weeks.length > 0) {
          setWeeksData(data.weeks);
        }
        if (data.totalContributions) {
          setTotalCount(data.totalContributions);
        }
      })
      .catch(() => {
        // Fail silently, fallback to githubContributions
      });
  }, []);

  const weeks = weeksData;
  const totalLabel = totalCount.toLocaleString("en-US");
  const sectionRef = useRef<HTMLDivElement>(null);

  const cols = weeks.length;
  const width = LEFT_OFFSET + cols * STEP - GAP;
  const height = TOP_OFFSET + ROWS * STEP - GAP;

  // Compute Month Labels (Aug, Sep, Oct, Nov, Dec, Jan, Feb, Mar, Apr, May, Jun, Jul, Aug)
  const monthLabels = useMemo(() => {
    const labels: { month: string; col: number }[] = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let lastMonth = -1;

    weeks.forEach((week, col) => {
      const firstDay = week.find((cell) => cell && cell.date);
      if (firstDay && typeof firstDay.date === "string") {
        const parts = firstDay.date.split("-");
        const m = parseInt(parts[1] || "", 10) - 1; // 0-indexed month (0=Jan, 11=Dec)
        if (!isNaN(m) && m !== lastMonth) {
          // Prevent placing month labels too close to each other
          const prevLabel = labels[labels.length - 1];
          if (!prevLabel || col - prevLabel.col >= 3) {
            labels.push({ month: monthNames[m]!, col });
            lastMonth = m;
          }
        }
      }
    });
    return labels;
  }, [weeks]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || reduced) return;

      const segs = gsap.utils.toArray<SVGRectElement>("[data-seg]", section);
      const cells = gsap.utils.toArray<SVGRectElement>("[data-cell]", section);
      const cellByKey = new Map<string, SVGRectElement>();
      cells.forEach((c) => cellByKey.set(c.dataset.key as string, c));

      const targets: Pt[] = [];
      const litKeys = new Set<string>();
      cells.forEach((c) => {
        if (c.dataset.level !== "0") {
          const parts = (c.dataset.key as string).split("-").map(Number);
          const col = parts[0] ?? 0;
          const row = parts[1] ?? 0;
          targets.push({ col, row });
          litKeys.add(c.dataset.key as string);
        }
      });

      const eaten = new Set<string>();

      const biteCell = (cell: SVGRectElement) => {
        cell.dataset.eaten = "true";
        cell.classList.add(styles.biting!);
        gsap.delayedCall(0.12, () => cell.classList.remove(styles.biting!));
      };

      const eatAt = (route: Pt[], i: number) => {
        const pt = route[i];
        if (!pt) return;
        const key = `${pt.col}-${pt.row}`;
        const cell = cellByKey.get(key);
        if (cell && cell.dataset.level !== "0" && !eaten.has(key)) {
          eaten.add(key);
          biteCell(cell);
        }
      };

      // Smooth snake path: slithers column-by-column across the timeline from left to right,
      // alternating row direction (boustrophedon wave) so movement is 100% continuous & smooth.
      const buildRoute = (): Pt[] => {
        if (!cols) return [];
        const route: Pt[] = [];

        // Find the first and last columns that contain lit targets
        let firstCol = 0;
        let lastCol = cols - 1;
        for (let c = 0; c < cols; c++) {
          if (weeks[c]?.some((cell: any) => cell && cell.level > 0)) {
            firstCol = c;
            break;
          }
        }
        for (let c = cols - 1; c >= 0; c--) {
          if (weeks[c]?.some((cell: any) => cell && cell.level > 0)) {
            lastCol = c;
            break;
          }
        }

        // Slither through active columns
        for (let c = firstCol; c <= lastCol; c++) {
          const isEven = (c - firstCol) % 2 === 0;
          if (isEven) {
            for (let r = 0; r < ROWS; r++) {
              route.push({ col: c, row: r });
            }
          } else {
            for (let r = ROWS - 1; r >= 0; r--) {
              route.push({ col: c, row: r });
            }
          }
        }
        return route;
      };

      const positionSnake = (route: Pt[], t: number) => {
        for (let k = 0; k < TAIL; k += 1) {
          const seg = segs[k];
          if (!seg) continue;
          const tk = t - k * SEG_GAP;
          if (tk < 0) {
            gsap.set(seg, { autoAlpha: 0 });
            continue;
          }
          const i = Math.floor(tk);
          const f = tk - i;
          const a = route[i];
          const b = route[Math.min(i + 1, route.length - 1)];
          if (!a || !b) {
            gsap.set(seg, { autoAlpha: 0 });
            continue;
          }
          // Set SVG attributes directly so positioning matches SVG viewBox exactly
          gsap.set(seg, {
            attr: {
              x: LEFT_OFFSET + (a.col + (b.col - a.col) * f) * STEP,
              y: TOP_OFFSET + (a.row + (b.row - a.row) * f) * STEP,
            },
            autoAlpha: headOpacity(k),
          });
        }
      };

      const reset = () => {
        eaten.clear();
        cells.forEach((c) => {
          delete c.dataset.eaten;
          c.classList.remove(styles.biting!);
        });
        gsap.set(segs, { autoAlpha: 0 });
      };

      gsap.set(segs, { autoAlpha: 0 });

      let tl: gsap.core.Timeline | null = null;
      let pending: gsap.core.Tween | null = null;
      let running = false;

      const runCycle = () => {
        if (!targets.length) return;
        if (tl) tl.kill();
        reset();
        const route = buildRoute();
        if (!route.length) return;
        const proxy = { p: 0 };
        let lastEaten = -1;
        tl = gsap.timeline({
          onComplete: () => {
            if (running) pending = gsap.delayedCall(CYCLE_PAUSE, runCycle);
          },
        });
        tl.to(proxy, {
          p: route.length - 1,
          duration: route.length * SECS_PER_CELL,
          ease: "none",
          delay: LEAD_IN,
          onUpdate: () => {
            const t = proxy.p;
            const fi = Math.min(Math.floor(t), route.length - 1);
            for (let i = lastEaten + 1; i <= fi; i += 1) eatAt(route, i);
            lastEaten = fi;
            positionSnake(route, t);
          },
        });
        tl.to(segs, { autoAlpha: 0, duration: 0.6, stagger: 0.05 }, ">-0.1");
      };

      const stop = () => {
        running = false;
        if (tl) tl.pause();
        if (pending) {
          pending.kill();
          pending = null;
        }
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            if (!running) {
              running = true;
              runCycle();
            }
          } else {
            stop();
          }
        },
      });

      if (trigger.isActive && !running) {
        running = true;
        runCycle();
      }

      return () => {
        trigger.kill();
        if (tl) tl.kill();
        if (pending) pending.kill();
      };
    },
    { scope: sectionRef, dependencies: [reduced, weeks] },
  );

  return (
    <div
      ref={sectionRef}
      className={`${styles.inner} w-full p-6 font-sans bg-[#0a0a0a] border border-[#262626] rounded-xl flex flex-col justify-between space-y-4 hover:border-amber/40 transition-colors shadow-lg`}
    >
      {/* Card Header matching GithubStatsCard, TopLanguagesCard, and StreakCard */}
      <div className="flex items-center justify-between border-b border-[#262626] pb-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 fill-amber" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64 7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-bold text-amber tracking-wider uppercase">
            {totalLabel} Contributions in the last year
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          Live Heatmap
        </span>
      </div>

      {/* SVG Grid Container */}
      <div className="w-full overflow-x-auto py-1 flex items-center justify-center scrollbar-thin scrollbar-thumb-zinc-800">
        <svg
          className={`${styles.grid} block w-full h-auto overflow-visible max-w-full`}
          data-grid
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${totalLabel} GitHub contributions in the last year`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Month Header Labels */}
          {monthLabels.map(({ month, col }) => (
            <text
              key={`${month}-${col}`}
              x={LEFT_OFFSET + col * STEP}
              y={12}
              className={styles.monthLabel}
            >
              {month}
            </text>
          ))}

          {/* Day Row Labels */}
          <text x={0} y={TOP_OFFSET + 1 * STEP + 9} className={styles.dayLabel}>
            Mon
          </text>
          <text x={0} y={TOP_OFFSET + 3 * STEP + 9} className={styles.dayLabel}>
            Wed
          </text>
          <text x={0} y={TOP_OFFSET + 5 * STEP + 9} className={styles.dayLabel}>
            Fri
          </text>

          {/* Grid Cells */}
          {weeks.map((week, col) =>
            week.map((cell, row) =>
              cell ? (
                <rect
                  key={`${col}-${row}`}
                  className={styles.cell}
                  data-cell
                  data-key={`${col}-${row}`}
                  data-level={cell.level}
                  x={LEFT_OFFSET + col * STEP}
                  y={TOP_OFFSET + row * STEP}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  ry={2}
                >
                  <title>{`${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${cell.date}`}</title>
                </rect>
              ) : null,
            ),
          )}

          {/* Snake Segments */}
          {!reduced && (
            <g className={styles.snake} data-snake aria-hidden="true">
              {Array.from({ length: TAIL }, (_, k) => (
                <rect
                  key={k}
                  className={styles.seg}
                  data-seg
                  x={0}
                  y={0}
                  width={CELL}
                  height={CELL}
                  rx={2.5}
                  ry={2.5}
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* Footer Legend */}
      <div className={styles.footer}>
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-sans">
          <span className="text-[11px] text-zinc-400">Learn how we count contributions</span>
        </div>

        <div className="flex items-center gap-2 text-zinc-400 text-xs">
          <span className={styles.legendLabel}>Less</span>
          <div className="flex items-center gap-1">
            {LEVELS.map((l) => (
              <span key={l} className={styles.legendCell} data-level={l} />
            ))}
          </div>
          <span className={styles.legendLabel}>More</span>
        </div>
      </div>
    </div>
  );
}
