"use client";

import type { CSSProperties } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, siteCopy } from "@/data/content";

const MARQUEE_DURATION = "52s";
const loopProjects = [...projects, ...projects];

export function ProjectsSection() {
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
            <span className="projects-scroll-arrow inline-block">→</span>
          </p>
        </div>
      </div>

      <div
        className="projects-carousel group/carousel relative flex flex-1 flex-col min-h-0"
        style={
          { "--projects-marquee-duration": MARQUEE_DURATION } as CSSProperties
        }
      >
        <div className="projects-track-shell relative flex-1 min-h-0">
          <div
            className="projects-track-fade projects-track-fade--left pointer-events-none absolute inset-y-0 left-0 z-10 w-12"
            aria-hidden="true"
          />
          <div
            className="projects-track-fade projects-track-fade--right pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
            aria-hidden="true"
          />

          <div className="projects-marquee-viewport flex h-full items-center overflow-hidden py-1">
            <div className="projects-marquee-track flex w-max gap-5">
              {loopProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  {...project}
                  index={index % projects.length}
                  ariaHidden={index >= projects.length}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="section-content shrink-0">
          <div className="h-[2px] overflow-hidden bg-black/[0.06]">
            <div className="projects-progress-fill h-full bg-[#1A6B35]" />
          </div>
        </div>
      </div>
    </>
  );
}
