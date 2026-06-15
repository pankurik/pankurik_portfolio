"use client";

import { useEffect, useState } from "react";
import { siteCopy } from "@/data/content";

type FeedItem = {
  type: "PushEvent" | "CreateEvent" | "PullRequestEvent" | "WatchEvent";
  repo: string;
  description: string;
  created_at: string;
};

function relativeTimeCompact(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffSec = Math.round(diffMs / 1000);
  const abs = Math.abs(diffSec);

  if (abs < 60) return "just now";
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return `${Math.abs(diffMin)}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return `${Math.abs(diffHr)}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffDay) < 30) return `${Math.abs(diffDay)}d ago`;
  const diffMo = Math.round(diffDay / 30);
  if (Math.abs(diffMo) < 12) return `${Math.abs(diffMo)}mo ago`;
  const diffYr = Math.round(diffMo / 12);
  return `${Math.abs(diffYr)}y ago`;
}

function TerminalGroup({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="terminal-group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function GitHubFeed() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<FeedItem[]>([]);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setRateLimited(false);

      try {
        const res = await fetch("/api/github");
        if (res.status === 429) {
          if (!cancelled) setRateLimited(true);
          return;
        }
        if (!res.ok) throw new Error(`github feed failed: ${res.status}`);
        const data = (await res.json()) as { events?: FeedItem[] };
        if (cancelled) return;
        setEvents(Array.isArray(data.events) ? data.events : []);
      } catch {
        if (!cancelled) setRateLimited(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const eventBaseDelay = 200;

  return (
    <div className="github-terminal w-full bg-[#0D0D0D]">
      <div className="flex items-center justify-center relative border-b border-white/[0.06] px-4 py-3">
        <div className="absolute left-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <p className="text-[11px] text-white/35 font-mono">
          {siteCopy.github.terminalTitle}
        </p>
      </div>

      <div className="terminal-body min-h-[420px] p-6 font-mono text-sm leading-relaxed">
        <TerminalGroup delay={0}>
          <p className="terminal-line">
            <span className="text-[#1A6B35]">~$</span>{" "}
            <span className="text-[#F5F5F0]">{siteCopy.github.command}</span>
          </p>
        </TerminalGroup>

        {loading && (
          <TerminalGroup delay={100}>
            <p className="terminal-line terminal-output pl-4 text-white/50">
              {siteCopy.github.fetching}
            </p>
          </TerminalGroup>
        )}

        {!loading && rateLimited && (
          <TerminalGroup delay={100}>
            <p className="terminal-line pl-4 text-[rgba(255,80,80,0.8)]">
              {siteCopy.github.rateLimitError}
            </p>
          </TerminalGroup>
        )}

        {!loading &&
          !rateLimited &&
          events.map((event, index) => (
            <TerminalGroup
              key={`${event.repo}-${event.created_at}-${index}`}
              delay={eventBaseDelay + index * 100}
            >
              <p className="terminal-line text-[#1A6B35]">✓ {event.type}</p>
              <p className="terminal-line terminal-output pl-4 text-white/50">
                <span className="text-[#F5F5F0]">{event.repo}</span>{" "}
                <span className="text-white/20">
                  {relativeTimeCompact(event.created_at)}
                </span>
              </p>
              <p className="terminal-line terminal-output pl-4 text-white/20">
                └── {event.description}
              </p>
              {index < events.length - 1 && <div className="h-3" />}
            </TerminalGroup>
          ))}

        {!loading && (
          <TerminalGroup
            delay={
              rateLimited
                ? 200
                : eventBaseDelay + Math.max(events.length, 1) * 100
            }
          >
            <p className="terminal-line terminal-comment text-white/20 mt-2">
              {siteCopy.github.currentlyBuildingLabel}
            </p>
            {siteCopy.github.building.map((item) => (
              <p
                key={item.repo}
                className="terminal-line terminal-output pl-4 text-white/50"
              >
                <span className="text-[#1A6B35]">→ {item.repo}</span>{" "}
                <span className="text-white/20">{item.note}</span>
              </p>
            ))}
            <span className="terminal-cursor inline-block mt-4" aria-hidden="true" />
          </TerminalGroup>
        )}
      </div>
    </div>
  );
}
