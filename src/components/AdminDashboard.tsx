"use client";

import { useMemo, useState } from "react";

export type QuestionRow = {
  id: number;
  question: string;
  answer: string;
  created_at: string;
};

type Props = {
  items: QuestionRow[];
  totalQuestions: number;
  questionsLast7Days: number;
  page: number;
  pageSize: number;
  query: string;
  adminKey: string;
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

function buildHref(adminKey: string, q: string, page: number) {
  const params = new URLSearchParams();
  params.set("key", adminKey);
  if (q.trim()) params.set("q", q.trim());
  params.set("page", String(page));
  return `/admin?${params.toString()}`;
}

export function AdminDashboard({
  items,
  totalQuestions,
  questionsLast7Days,
  page,
  pageSize,
  query,
  adminKey,
}: Props) {
  const [q, setQ] = useState(query);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalQuestions / pageSize)),
    [totalQuestions, pageSize]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          <div>
            <h1 className="text-white text-2xl font-semibold tracking-tight">
              Question Log
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {totalQuestions.toLocaleString()} total questions
            </p>
          </div>

          <form
            className="flex-1 max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = buildHref(adminKey, q, 1);
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search questions…"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/60 focus:shadow-[0_0_0_1px_rgba(0,234,255,0.18)]"
            />
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Total
            </p>
            <p className="mt-2 text-white text-2xl font-semibold">
              {totalQuestions.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Last 7 days
            </p>
            <p className="mt-2 text-white text-2xl font-semibold">
              {questionsLast7Days.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {items.map((row) => {
            const isOpen = Boolean(expanded[row.id]);
            return (
              <article
                key={row.id}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-baseline justify-between gap-6 flex-wrap">
                  <h2 className="text-white font-semibold leading-relaxed">
                    {row.question}
                  </h2>
                  <p className="text-xs text-zinc-600">
                    {relativeTime(row.created_at)}
                  </p>
                </div>

                <div className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  <div
                    style={
                      isOpen
                        ? undefined
                        : ({
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          } as const)
                    }
                  >
                    {row.answer}
                  </div>

                  {row.answer.length > 220 && (
                    <button
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [row.id]: !prev[row.id],
                        }))
                      }
                      className="mt-2 text-accent hover:opacity-90 text-sm cursor-pointer"
                    >
                      {isOpen ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <a
            className={`text-sm px-3 py-2 rounded-xl border border-border ${
              page <= 1
                ? "pointer-events-none opacity-40"
                : "hover:border-accent/60 hover:text-white"
            }`}
            href={buildHref(adminKey, query, Math.max(1, page - 1))}
          >
            ← Prev
          </a>

          <p className="text-sm text-zinc-500">
            Page {page} of {totalPages}
          </p>

          <a
            className={`text-sm px-3 py-2 rounded-xl border border-border ${
              page >= totalPages
                ? "pointer-events-none opacity-40"
                : "hover:border-accent/60 hover:text-white"
            }`}
            href={buildHref(adminKey, query, Math.min(totalPages, page + 1))}
          >
            Next →
          </a>
        </div>
      </main>
    </div>
  );
}

