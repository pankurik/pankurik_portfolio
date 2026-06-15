"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, siteCopy } from "@/data/content";

export function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: track.scrollLeft,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;
    e.preventDefault();
    const walk = e.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.scrollLeft - walk;
    updateProgress();
  };

  const endDrag = () => {
    dragState.current.active = false;
    setIsDragging(false);
  };

  return (
    <section id="projects" className="bg-[#F5F5F0] text-[#0D0D0D]">
      <div className="border-b border-black/[0.08] px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="chat-section-label">{siteCopy.projects.sectionLabel}</p>
            <h2 className="mt-2 font-display text-[clamp(40px,8vw,64px)] leading-[0.95] tracking-tight">
              {siteCopy.projects.headline}{" "}
              <span className="text-[#1A6B35]">{siteCopy.projects.headlineAccent}</span>
            </h2>
          </div>
          <p className="text-xs text-black/40 flex items-center gap-1">
            {siteCopy.projects.dragHint}
            <span className="projects-drag-arrow inline-block">→</span>
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className={[
          "projects-track flex overflow-x-auto",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab",
        ].join(" ")}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onScroll={updateProgress}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>

      <div className="h-[2px] bg-black/[0.06]">
        <div
          className="h-full bg-[#1A6B35] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </section>
  );
}
