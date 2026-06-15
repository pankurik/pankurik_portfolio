import type { Project } from "@/data/content";

export function ProjectCard({ title, type, description, tags, link, whatIBuilt }: Project) {
  return (
    <article className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_0_1px_rgba(0,234,255,0.18),0_18px_60px_rgba(0,0,0,0.55)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-white font-semibold tracking-tight">{title}</h3>
        <span className="shrink-0 inline-flex items-center rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent">
          {type}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-400">{description}</p>

      <details className="mt-5 rounded-xl border border-border bg-background/30 px-4 py-3 open:bg-background/40 open:border-accent/30 transition-colors">
        <summary className="cursor-pointer select-none list-none text-sm text-white/90 flex items-center justify-between">
          <span>What I built</span>
          <span className="text-accent/90 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">{whatIBuilt}</p>
      </details>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full border border-border bg-background/25 px-2.5 py-1 text-[11px] text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>

      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex text-sm text-accent hover:opacity-80 transition-opacity"
      >
        View project →
      </a>
    </article>
  );
}
