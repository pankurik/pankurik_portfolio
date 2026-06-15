"use client";

import { useState } from "react";
import { skillCategories, siteCopy } from "@/data/content";

export function SkillsGrid() {
  const [activeSkill, setActiveSkill] = useState<{
    name: string;
    context: string;
  } | null>(null);

  return (
    <div className="skills-panel pb-2 skills-panel-inner">
      <div className="section-content">
        <div className="skills-categories grid gap-6 md:grid-cols-2 lg:gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="skills-category border border-black/[0.06] bg-white p-5 md:p-6"
              onMouseLeave={() => setActiveSkill(null)}
            >
              <p className="section-label mb-4">{category.label}</p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <button
                    key={skill.name}
                    type="button"
                    className={[
                      "skill-pill",
                      skill.primary ? "skill-pill-primary" : "",
                      activeSkill?.name === skill.name ? "is-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onMouseEnter={() =>
                      setActiveSkill({
                        name: skill.name,
                        context: skill.context,
                      })
                    }
                    onFocus={() =>
                      setActiveSkill({
                        name: skill.name,
                        context: skill.context,
                      })
                    }
                    onBlur={() => setActiveSkill(null)}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="skills-detail mt-10 min-h-[3.25rem] border-t border-black/[0.06] pt-6"
          aria-live="polite"
        >
          {activeSkill ? (
            <p className="skills-detail-text font-mono text-[12px] leading-relaxed">
              <span className="text-[#1A6B35]">{activeSkill.name}</span>
              <span className="text-black/25"> — </span>
              <span className="text-black/50">{activeSkill.context}</span>
            </p>
          ) : (
            <p className="skills-detail-placeholder font-mono text-[11px] text-black/25">
              {siteCopy.skills.hoverHint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
