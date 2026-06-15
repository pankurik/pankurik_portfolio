"use client";

import { useEffect, useRef, useState } from "react";
import { skillItems } from "@/data/content";

export function SkillsGrid() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = arenaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={arenaRef}
      className="skills-arena relative h-[600px] overflow-hidden p-8"
    >
      {skillItems.map((skill, index) => (
        <span
          key={skill.name}
          className={[
            "skill-tag group",
            `skill-tag-${skill.size}`,
            skill.green ? "skill-tag-green" : "",
            inView ? "is-visible" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          data-direction={skill.direction}
          style={
            {
              top: skill.position.top,
              left: skill.position.left,
              right: skill.position.right,
              bottom: skill.position.bottom,
              "--skill-rot": `${skill.rotation}deg`,
              "--skill-delay": `${index * 40}ms`,
            } as React.CSSProperties
          }
        >
          {skill.name}
          <span className="skill-tooltip" role="tooltip">
            {skill.tooltip}
          </span>
        </span>
      ))}
    </div>
  );
}
