"use client";

import { useEffect, useState } from "react";
import { siteCopy } from "@/data/content";

type StatsResponse = {
  totalQuestions: number;
  questionsThisWeek: number;
  recentQuestions: string[];
};

const PLACEHOLDER_STATS = {
  uniqueVisitors: "128",
  topicsCovered: "12",
};

const TOP_TOPICS = [
  { label: "Projects", percent: 85 },
  { label: "Tech stack", percent: 62 },
  { label: "Personal", percent: 48 },
  { label: "Availability", percent: 30 },
];

export function ChatStatsPanel() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch("/api/chat/stats");
        if (!res.ok) throw new Error("stats fetch failed");
        const data = (await res.json()) as StatsResponse;
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) {
          setStats({
            totalQuestions: 0,
            questionsThisWeek: 0,
            recentQuestions: [],
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  const statCards = [
    {
      label: "Total questions asked",
      value: loading ? "—" : String(stats?.totalQuestions ?? 0),
    },
    {
      label: "Questions this week",
      value: loading ? "—" : String(stats?.questionsThisWeek ?? 0),
    },
    {
      label: "Unique visitors",
      value: PLACEHOLDER_STATS.uniqueVisitors,
    },
    {
      label: "Topics covered",
      value: PLACEHOLDER_STATS.topicsCovered,
    },
  ];

  return (
    <aside className="flex flex-col bg-[#F0F0EB] px-6 py-8 overflow-y-auto">
      <p className="chat-section-label">{siteCopy.chat.statsLabel}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-black/[0.08] bg-white px-4 py-5"
          >
            <p className="font-display text-[48px] leading-none text-[#1A6B35]">
              {card.value}
            </p>
            <p className="mt-2 text-[11px] text-black/40 leading-snug">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="chat-section-label">{siteCopy.chat.topicsLabel}</p>
        <div className="mt-4 space-y-3">
          {TOP_TOPICS.map((topic) => (
            <div key={topic.label}>
              <div className="flex items-baseline justify-between gap-3 text-xs text-black/50">
                <span>{topic.label}</span>
                <span>{topic.percent}%</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1A6B35]"
                  style={{ width: `${topic.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="chat-section-label">{siteCopy.chat.recentLabel}</p>
        <ul className="mt-4 space-y-3">
          {loading ? (
            <>
              <li className="h-4 w-3/4 rounded bg-black/[0.05] animate-pulse" />
              <li className="h-4 w-2/3 rounded bg-black/[0.05] animate-pulse" />
            </>
          ) : stats?.recentQuestions.length ? (
            stats.recentQuestions.map((question) => (
              <li
                key={question}
                className="text-sm text-black/60 leading-relaxed flex gap-2"
              >
                <span className="text-[#1A6B35] shrink-0">→</span>
                <span>{question}</span>
              </li>
            ))
          ) : (
            <li className="text-sm text-black/40">{siteCopy.chat.noRecentQuestions}</li>
          )}
        </ul>
      </div>
    </aside>
  );
}
