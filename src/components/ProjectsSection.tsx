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

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.stopPropagation();
    }
  };

  return (
    <>
      <div className="section-content shrink-0">
        <div className="section-intro">
          <div className="section-intro-title">
            <p className="section-label">{siteCopy.projects.sectionLabel}</p>
            <h2 className="section-title">
              {siteCopy.projects.headline}{" "}
              <span className="section-title-accent">
                {siteCopy.projects.headlineAccent}
              </span>
            </h2>
          </div>
          <p className="section-intro-meta flex items-center gap-1">
            {siteCopy.projects.dragHint}
            <span className="projects-drag-arrow inline-block">→</span>
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className={[
          "projects-track flex flex-1 overflow-x-auto min-h-0",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab",
        ].join(" ")}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onScroll={updateProgress}
        onWheel={handleWheel}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>

      <div className="h-[2px] bg-black/[0.06] shrink-0">
        <div
          className="h-full bg-[#1A6B35] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  );
}
