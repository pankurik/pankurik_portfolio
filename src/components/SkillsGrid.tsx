"use client";

import { useEffect, useRef, useState } from "react";

type SkillCategory = {
  label: string;
  skills: string[];
};

const CATEGORIES: SkillCategory[] = [
  { label: "Languages", skills: ["Python", "TypeScript", "SQL", "Swift"] },
  { label: "Frontend", skills: ["React", "Next.js", "SwiftUI", "Tailwind CSS"] },
  {
    label: "Backend & APIs",
    skills: ["FastAPI", "Node.js", "REST APIs", "PostgreSQL", "MySQL"],
  },
  {
    label: "DevOps & Cloud",
    skills: [
      "AWS (EC2, S3, Lambda, RDS)",
      "Docker",
      "CI/CD",
      "GitHub Actions",
    ],
  },
];

export function SkillsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <p className="text-accent text-xs uppercase tracking-[0.22em] font-semibold">
              {cat.label}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-1.5 text-[12px] text-white transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_0_1px_rgba(0,234,255,0.22),0_10px_30px_rgba(0,0,0,0.35)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        I pick tools based on what the problem needs, not habit.
      </p>
    </div>
  );
}

