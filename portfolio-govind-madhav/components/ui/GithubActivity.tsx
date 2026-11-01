"use client";

/**
 * @file components/ui/GithubActivity.tsx
 * @description Dynamic GitHub activity dashboard showcasing stats, languages, heatmaps, and live calculated contribution streaks.
 */

import React, { useState, useEffect, useRef } from "react";
import Contributions from "./Contributions";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import githubContributions from "@/data/github-contributions.json";
import { calculateGithubStreak, StreakStats } from "@/lib/github-streak-calculator";

interface GithubActivityProps {
  socialGithub: string;
  statsCommits: string;
  socialGithubLink?: string;
}

interface LanguageStat {
  name: string;
  percent: number;
  color: string;
}

interface LiveStatsState {
  totalStars: number;
  totalPRs: number;
  totalRepos: number;
  languages: LanguageStat[];
}

function GithubStatsCard({
  username,
  totalCommits,
  totalStars,
  totalPRs,
  totalRepos,
}: {
  username: string;
  totalCommits: number;
  totalStars: number;
  totalPRs: number;
  totalRepos: number;
}) {
  return (
    <div className="w-full p-6 font-sans bg-[#0a0a0a] border border-[#262626] rounded-xl flex flex-col justify-between h-full space-y-4 hover:border-amber/40 transition-colors shadow-lg">
      <div className="flex items-center justify-between border-b border-[#262626] pb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 fill-amber" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64 7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-bold text-amber tracking-wider uppercase">{username}&apos;s GitHub Overview</span>
        </div>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="bg-[#121212] p-3 rounded-lg border border-[#1f1f1f]">
          <span className="text-zinc-500 text-[10px] block uppercase tracking-wider mb-1">Total Stars</span>
          <span className="text-white font-bold text-base">{totalStars}</span>
        </div>
        <div className="bg-[#121212] p-3 rounded-lg border border-[#1f1f1f]">
          <span className="text-zinc-500 text-[10px] block uppercase tracking-wider mb-1">Total Commits</span>
          <span className="text-emerald-400 font-bold text-base">{totalCommits}+</span>
        </div>
        <div className="bg-[#121212] p-3 rounded-lg border border-[#1f1f1f]">
          <span className="text-zinc-500 text-[10px] block uppercase tracking-wider mb-1">Total PRs</span>
          <span className="text-white font-bold text-base">{totalPRs}</span>
        </div>
        <div className="bg-[#121212] p-3 rounded-lg border border-[#1f1f1f]">
          <span className="text-zinc-500 text-[10px] block uppercase tracking-wider mb-1">Contributed to</span>
          <span className="text-amber font-bold text-base">{totalRepos} repos</span>
        </div>
      </div>
    </div>
  );
}

function TopLanguagesCard({ languages }: { languages: LanguageStat[] }) {
  const displayLanguages = languages.length > 0 ? languages : [
    { name: "TypeScript", percent: 45, color: "#F59E0B" },
    { name: "JavaScript", percent: 30, color: "#10B981" },
    { name: "Java / Spring", percent: 15, color: "#3B82F6" },
    { name: "Python / AI", percent: 10, color: "#8B5CF6" },
  ];

  return (
    <div className="w-full p-6 font-sans bg-[#0a0a0a] border border-[#262626] rounded-xl flex flex-col justify-between h-full space-y-4 hover:border-amber/40 transition-colors shadow-lg">
      <div className="flex items-center justify-between border-b border-[#262626] pb-3">
        <span className="text-xs font-bold text-amber tracking-wider uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber"></span>
          Most Used Languages
        </span>
        <span className="text-[10px] font-mono text-zinc-500">Live Stack</span>
      </div>
      
      {/* Progress Bar Header */}
      <div className="w-full h-2.5 rounded-full bg-[#171717] overflow-hidden flex shadow-inner">
        {displayLanguages.map((lang) => (
          <div
            key={lang.name}
            style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
            className="h-full transition-all duration-500"
            title={`${lang.name}: ${lang.percent}%`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
        {displayLanguages.map((lang) => (
          <div key={lang.name} className="flex items-center justify-between bg-[#121212] px-3 py-2 rounded-lg border border-[#1f1f1f]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
              <span className="text-zinc-300 text-[11px] truncate max-w-[90px]">{lang.name}</span>
            </div>
            <span className="font-bold text-[11px]" style={{ color: lang.color }}>{lang.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StreakCard({ streakStats }: { streakStats: StreakStats }) {
  return (
    <div className="w-full p-6 font-sans bg-[#0a0a0a] border border-[#262626] rounded-xl flex flex-col justify-between h-full space-y-4 hover:border-amber/40 transition-colors shadow-lg">
      <div className="flex items-center justify-between border-b border-[#262626] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-amber text-sm">🔥</span>
          <span className="text-xs font-bold text-amber tracking-wider uppercase">GitHub Contribution Streak</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
          Active Streak
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center font-mono">
        <div className="bg-[#121212] p-3.5 rounded-lg border border-[#1f1f1f]">
          <span className="block text-[10px] text-zinc-500 tracking-wider mb-1">TOTAL COMMITS</span>
          <span className="text-amber font-bold text-xl">{streakStats.totalCommits}+</span>
        </div>
        <div className="bg-[#121212] p-3.5 rounded-lg border border-[#1f1f1f] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/10 rounded-bl-full" />
          <span className="block text-[10px] text-zinc-500 tracking-wider mb-1">CURRENT STREAK</span>
          <span className="text-emerald-400 font-bold text-xl">{streakStats.currentStreak} Days</span>
        </div>
        <div className="bg-[#121212] p-3.5 rounded-lg border border-[#1f1f1f]">
          <span className="block text-[10px] text-zinc-500 tracking-wider mb-1">LONGEST STREAK</span>
          <span className="text-amber font-bold text-xl">{streakStats.longestStreak} Days</span>
        </div>
      </div>
    </div>
  );
}

export default function GithubActivity({ socialGithub, statsCommits, socialGithubLink }: GithubActivityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [streakStats, setStreakStats] = useState<StreakStats>(() =>
    calculateGithubStreak(githubContributions.weeks, githubContributions.total)
  );

  const [liveStats, setLiveStats] = useState<LiveStatsState>({
    totalStars: 1,
    totalPRs: 6,
    totalRepos: 11,
    languages: [],
  });

  const githubUsername = socialGithub
    ? socialGithub.replace(/\/$/, "").split("/").pop() || "Govind-Madhav"
    : "Govind-Madhav";

  const githubUrl = socialGithubLink || socialGithub || `https://github.com/${githubUsername}`;

  useEffect(() => {
    fetch("/api/github-stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.weeks && Array.isArray(data.weeks)) {
          const stats = calculateGithubStreak(data.weeks, data.totalContributions || githubContributions.total);
          setStreakStats(stats);
        }
        setLiveStats({
          totalStars: data.totalStars ?? 1,
          totalPRs: data.totalPRs ?? 6,
          totalRepos: data.totalRepos ?? 11,
          languages: data.languages || [],
        });
      })
      .catch(() => {
        // Fail silently
      });
  }, []);

  useGSAP(() => {
    const rows = gsap.utils.toArray<HTMLElement>('.stack-row', containerRef.current);
    
    rows.forEach((row, i) => {
      if (i === rows.length - 1) return;

      gsap.to(row, {
        scale: 0.9,
        opacity: 0.5,
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: row,
          start: `top ${100 + i * 20}px`,
          endTrigger: rows[i + 1],
          end: `top ${120 + i * 20}px`,
          scrub: true,
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section className="bg-bg py-24 px-4 md:px-[8vw]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-1 pb-4 border-b border-border">
          <h2 className="font-syne font-bold text-[11px] tracking-[0.2em] text-text-muted uppercase">
            GITHUB ACTIVITY
          </h2>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter font-medium text-[13px] text-amber hover:underline w-fit"
          >
            @{githubUsername}
          </a>
        </div>

        {/* Dashboard Grid */}
        <div ref={containerRef} className="flex flex-col relative pb-32 gap-12">
          {/* ROW 1 */}
          <div className="stack-row sticky top-[100px] z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-4 bg-bg pt-4">
            <GithubStatsCard
              username={githubUsername}
              totalCommits={streakStats.totalCommits}
              totalStars={liveStats.totalStars}
              totalPRs={liveStats.totalPRs}
              totalRepos={liveStats.totalRepos}
            />
            <TopLanguagesCard languages={liveStats.languages} />
          </div>

          {/* ROW 2 */}
          <div className="stack-row sticky top-[120px] z-20 w-full bg-bg pt-4">
            <Contributions />
          </div>

          {/* ROW 3 */}
          <div className="stack-row sticky top-[140px] z-30 w-full bg-bg pt-4 grid grid-cols-1 gap-4">
            <StreakCard streakStats={streakStats} />
          </div>
        </div>
      </div>
    </section>
  );
}
