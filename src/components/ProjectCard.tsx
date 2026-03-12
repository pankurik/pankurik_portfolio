type ProjectType = "Professional" | "Personal";

type CaseStudy = {
  problem: string;
  built: string;
  differently: string;
};

export type ProjectCardProps = {
  name: string;
  type: ProjectType;
  description: string;
  tech: string[];
  caseStudy: CaseStudy;
};

export function ProjectCard({
  name,
  type,
  description,
  tech,
  caseStudy,
}: ProjectCardProps) {
  return (
    <article className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_0_0_1px_rgba(0,234,255,0.18),0_18px_60px_rgba(0,0,0,0.55)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-white font-semibold tracking-tight">{name}</h3>
        <span className="shrink-0 inline-flex items-center rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent">
          {type}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-400">{description}</p>

      <details className="mt-5 rounded-xl border border-border bg-background/30 px-4 py-3 open:bg-background/40 open:border-accent/30 transition-colors">
        <summary className="cursor-pointer select-none list-none text-sm text-white/90 flex items-center justify-between">
          <span>Case Study</span>
          <span className="text-accent/90 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Problem
            </p>
            <p className="mt-2">{caseStudy.problem}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              What I built
            </p>
            <p className="mt-2">{caseStudy.built}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              What I’d do differently
            </p>
            <p className="mt-2">{caseStudy.differently}</p>
          </div>
        </div>
      </details>

      <div className="mt-6 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full border border-border bg-background/25 px-2.5 py-1 text-[11px] text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

