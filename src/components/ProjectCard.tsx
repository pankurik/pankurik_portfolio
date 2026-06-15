import type { Project } from "@/data/content";

type ProjectCardProps = Project & {
  index: number;
  ariaHidden?: boolean;
};

const TYPE_ACCENT: Record<Project["type"], string> = {
  Professional: "#1A6B35",
  Personal: "#228040",
  Team: "#7AB892",
};

export function ProjectCard({
  title,
  description,
  tagPills,
  role,
  period,
  tags,
  type,
  featured,
  index,
  ariaHidden = false,
}: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const typeAccent = TYPE_ACCENT[type];

  if (featured) {
    return (
      <article className="project-card project-card-featured group relative flex w-[420px] h-[560px] shrink-0 flex-col justify-between border border-[#145529]/20 p-12 shadow-[0_8px_32px_rgba(26,107,53,0.18)] transition-[background-color,transform,box-shadow] duration-300 hover:bg-[#145529] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(26,107,53,0.22)]" aria-hidden={ariaHidden || undefined}>
        <span className="pointer-events-none absolute top-8 right-8 font-display text-[96px] leading-none text-white/10 transition-colors duration-300 group-hover:text-white/20">
          {number}
        </span>

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2">
            {tagPills.map((pill) => (
              <span
                key={pill}
                className="px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] border border-white/40 text-white/90"
              >
                {pill}
              </span>
            ))}
          </div>

          <h3 className="mt-6 font-display text-[42px] leading-[0.95] tracking-tight text-white">
            {title}
          </h3>

          <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-white/50">
            {role} · {period}
          </p>

          <p className="mt-5 text-xs leading-relaxed text-white/70">
            {description.map((part, i) =>
              part.emphasis ? (
                <em key={i} className="text-white not-italic font-normal">
                  {part.text}
                </em>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] border border-white/20 text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="project-card project-card-standard group relative flex w-[400px] h-[560px] shrink-0 flex-col justify-between border border-black/[0.08] bg-[#F5F5F0] p-12 pl-11 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      style={{ borderLeftWidth: "4px", borderLeftColor: typeAccent }}
      aria-hidden={ariaHidden || undefined}
    >
      <span className="pointer-events-none absolute top-8 right-8 font-display text-[96px] leading-none text-black/[0.05] transition-colors duration-300 group-hover:text-[#1A6B35]/20">
        {number}
      </span>

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          {tagPills.map((pill) => (
            <span
              key={pill}
              className="px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] border border-[#1A6B35]/30 text-[#1A6B35]"
            >
              {pill}
            </span>
          ))}
        </div>

        <h3 className="mt-6 font-display text-[40px] leading-[0.95] tracking-tight text-[#0D0D0D]">
          {title}
        </h3>

        <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-black/35">
          {role} · {period}
        </p>

        <p className="mt-5 text-xs leading-relaxed text-black/50">
          {description.map((part, i) =>
            part.emphasis ? (
              <em key={i} className="text-[#0D0D0D] not-italic font-normal">
                {part.text}
              </em>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </p>
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] border border-black/[0.08] text-black/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
