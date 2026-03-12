import { NextResponse } from "next/server";

type GitHubEvent = {
  type: string;
  repo?: { name?: string };
  created_at?: string;
  payload?: {
    ref?: string | null;
    ref_type?: string;
    action?: string;
    pull_request?: { number?: number };
  };
};

type FeedItem = {
  type: "PushEvent" | "CreateEvent" | "PullRequestEvent" | "WatchEvent";
  repo: string;
  description: string;
  created_at: string;
};

function branchFromRef(ref?: string | null) {
  if (!ref) return null;
  return ref.startsWith("refs/heads/") ? ref.replace("refs/heads/", "") : ref;
}

function describeEvent(e: GitHubEvent): FeedItem | null {
  const repo = e.repo?.name ?? "";
  const created_at = e.created_at ?? "";
  if (!repo || !created_at) return null;

  if (e.type === "PushEvent") {
    const branch = branchFromRef(e.payload?.ref) ?? "main";
    return {
      type: "PushEvent",
      repo,
      description: `Pushed to ${branch}`,
      created_at,
    };
  }

  if (e.type === "CreateEvent") {
    const refType = e.payload?.ref_type;
    if (refType === "repository") {
      return { type: "CreateEvent", repo, description: "Created repository", created_at };
    }
    const ref = e.payload?.ref ?? "";
    if (refType === "branch") {
      return { type: "CreateEvent", repo, description: `Created branch ${ref}`, created_at };
    }
    if (refType === "tag") {
      return { type: "CreateEvent", repo, description: `Created tag ${ref}`, created_at };
    }
    return { type: "CreateEvent", repo, description: "Created something new", created_at };
  }

  if (e.type === "PullRequestEvent") {
    const action = e.payload?.action ?? "opened";
    const actionText =
      action === "opened"
        ? "Opened a pull request"
        : action === "closed"
          ? "Closed a pull request"
          : action === "reopened"
            ? "Reopened a pull request"
            : "Updated a pull request";
    return { type: "PullRequestEvent", repo, description: actionText, created_at };
  }

  if (e.type === "WatchEvent") {
    return { type: "WatchEvent", repo, description: "Starred repository", created_at };
  }

  return null;
}

export async function GET() {
  const url = "https://api.github.com/users/pankurik/events/public";

  const res = await fetch(url, {
    headers: {
      "User-Agent": "pankurik-portfolio",
      Accept: "application/vnd.github+json",
    },
    // Keep a bit of caching so we don’t burn the 60/hr unauthenticated limit
    next: { revalidate: 300 },
  });

  if (res.status === 403) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    if (remaining === "0") {
      const reset = res.headers.get("x-ratelimit-reset");
      return NextResponse.json(
        {
          error: "rate_limited",
          reset: reset ? Number(reset) : null,
          events: [],
        },
        { status: 429 }
      );
    }
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: "github_fetch_failed", events: [] },
      { status: 502 }
    );
  }

  const raw: GitHubEvent[] = await res.json();
  const allowed = new Set([
    "PushEvent",
    "CreateEvent",
    "PullRequestEvent",
    "WatchEvent",
  ]);

  const events: FeedItem[] = raw
    .filter((e) => allowed.has(e.type))
    .map((e) => describeEvent(e))
    .filter((x): x is FeedItem => Boolean(x))
    .slice(0, 6);

  return NextResponse.json({ events });
}

