"use client";

import { useEffect, useState } from "react";

type StatsResponse = {
  totalQuestions: number;
  questionsThisWeek: number;
};

type ChatInlineStatsProps = {
  refreshKey?: number;
};

export function ChatInlineStats({ refreshKey = 0 }: ChatInlineStatsProps) {
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
          setStats({ totalQuestions: 0, questionsThisWeek: 0 });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (loading) {
    return <span className="chat-shell-title">loading stats…</span>;
  }

  return (
    <span className="chat-shell-title">
      {stats?.totalQuestions ?? 0} asked · {stats?.questionsThisWeek ?? 0} this week
    </span>
  );
}
