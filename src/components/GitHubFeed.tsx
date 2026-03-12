"use client";

import { useEffect, useMemo, useState } from "react";

type FeedItem = {
  type: "PushEvent" | "CreateEvent" | "PullRequestEvent" | "WatchEvent";
  repo: string;
  description: string;
  created_at: string;
};

function relativeTime(iso: string) {
  const date = new Date(iso);
  const diffMs = date.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const abs = Math.abs(diffSec);
  if (abs < 60) return rtf.format(diffSec, "second");
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day");
  const diffMo = Math.round(diffDay / 30);
  if (Math.abs(diffMo) < 12) return rtf.format(diffMo, "month");
  const diffYr = Math.round(diffMo / 12);
  return rtf.format(diffYr, "year");
}

function SkeletonRow() {
  return (
    <div className="relative pl-6">
      <span className="absolute left-0 top-[6px] w-2.5 h-2.5 rounded-full bg-accent/30" />
      <div className="h-4 w-[68%] rounded bg-white/5 animate-pulse" />
      <div className="mt-2 h-3 w-[40%] rounded bg-white/5 animate-pulse" />
    </div>
  );
}

export function GitHubFeed() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<FeedItem[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setFailed(false);

      try {
        const res = await fetch("/api/github");
        if (!res.ok) {
          // rate-limited (429) or upstream error — we’ll just show fallback
          throw new Error(`github feed failed: ${res.status}`);
        }
        const data = (await res.json()) as { events?: FeedItem[] };
        if (cancelled) return;
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch {
        if (cancelled) return;
        setFailed(true);
        setEvents([]);
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const isEmpty = useMemo(() => !events || events.length === 0, [events]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <p className="text-sm text-zinc-300">Active on GitHub</p>
      </div>

      <div className="relative mt-6">
        <div className="absolute left-[4px] top-1 bottom-1 w-px bg-border" />

        <div className="space-y-5">
          {loading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : isEmpty || failed ? (
            <div className="pl-6">
              <p className="text-sm text-zinc-500">
                Check my GitHub for latest activity
              </p>
            </div>
          ) : (
            events!.map((e, idx) => (
              <div key={`${e.repo}-${e.created_at}-${idx}`} className="relative pl-6">
                <span className="absolute left-0 top-[6px] w-2.5 h-2.5 rounded-full bg-accent glow" />
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <p className="text-sm text-zinc-200">{e.description}</p>
                  <span className="text-sm font-mono text-accent">{e.repo}</span>
                  <span className="text-xs text-zinc-600">
                    {relativeTime(e.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6">
        <a
          href="https://github.com/pankurik"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          View GitHub →
        </a>
      </div>
    </div>
  );
}

