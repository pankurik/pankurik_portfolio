import type { Project } from "@/data/content";
import { siteCopy } from "@/data/content";

type ProjectCardProps = Project & {
  index: number;
};

export function ProjectCard({
  title,
  description,
  tagPills,
  role,
  period,
  tags,
  link,
  featured,
  index,
}: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={[
        "project-card group relative flex w-[420px] h-[580px] shrink-0 snap-start flex-col justify-between border-r border-black/[0.08] p-12 transition-colors duration-300",
        featured
          ? "bg-[#1A6B35] hover:bg-[#145529]"
          : "bg-transparent hover:bg-white",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none absolute top-8 right-8 font-display text-[96px] leading-none transition-colors duration-300",
          featured
            ? "text-white/10 group-hover:text-white/20"
            : "text-black/[0.06] group-hover:text-[#1A6B35]/30",
        ].join(" ")}
      >
        {number}
      </span>

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          {tagPills.map((pill) => (
            <span
              key={pill}
              className={[
                "px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] border",
                featured
                  ? "border-white/40 text-white/90"
                  : "border-[#1A6B35] text-[#1A6B35]",
              ].join(" ")}
            >
              {pill}
            </span>
          ))}
        </div>

        <h3
          className={[
            "mt-6 font-display text-[42px] leading-[0.95] tracking-tight",
            featured ? "text-white" : "text-[#0D0D0D]",
          ].join(" ")}
        >
          {title}
        </h3>

        <p
          className={[
            "mt-3 text-[10px] uppercase tracking-[0.14em]",
            featured ? "text-white/50" : "text-black/30",
          ].join(" ")}
        >
          {role} · {period}
        </p>

        <p
          className={[
            "mt-5 text-xs leading-relaxed",
            featured ? "text-white/70" : "text-black/40",
          ].join(" ")}
        >
          {description.map((part, i) =>
            part.emphasis ? (
              <em
                key={i}
                className={featured ? "text-white not-italic font-normal" : "text-[#0D0D0D] not-italic font-normal"}
              >
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
              className={[
                "px-2.5 py-1 text-[10px] border",
                featured
                  ? "border-white/20 text-white/60"
                  : "border-black/[0.08] text-black/35",
              ].join(" ")}
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={[
            "inline-flex mt-5 text-sm transition-all duration-300",
            featured
              ? "text-white opacity-100 translate-y-0"
              : "text-[#1A6B35] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
          ].join(" ")}
        >
          {siteCopy.projects.cta}
        </a>
      </div>
    </article>
  );
}
