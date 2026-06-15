"use client";

import { useState } from "react";
import { toolCategories, siteCopy } from "@/data/content";

const PRIMARY_TOOLS = new Set(["Cursor", "Claude", "Claude Code"]);

export function ToolsSection() {
  const [activeCategoryId, setActiveCategoryId] = useState(toolCategories[0].id);
  const [activeTool, setActiveTool] = useState<{
    name: string;
    description: string;
  } | null>(null);

  const activeCategory =
    toolCategories.find((category) => category.id === activeCategoryId) ??
    toolCategories[0];
  const totalTools = toolCategories.reduce(
    (count, category) => count + category.tools.length,
    0
  );

  return (
    <div className="tools-panel pb-2 tools-panel-inner">
      <div className="section-content">
        <div className="tools-manifest-header mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] pb-4">
          <p className="font-mono text-[11px] text-black/35">
            <span className="text-[#1A6B35]">~/toolbelt</span>
            <span className="text-black/20"> · </span>
            {totalTools} tools
            <span className="text-black/20"> · </span>
            what I actually reach for daily
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/25">
            manifest v1
          </p>
        </div>

        <div className="tools-layout grid gap-6 lg:grid-cols-[minmax(0,11rem)_1fr] lg:gap-8">
          <nav
            className="tools-category-nav flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
            aria-label="Tool categories"
          >
            {toolCategories.map((category) => {
              const isActive = category.id === activeCategoryId;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={[
                    "tools-category-tab shrink-0",
                    isActive ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    setActiveCategoryId(category.id);
                    setActiveTool(null);
                  }}
                >
                  <span className="tools-category-tab-file">{category.id}.env</span>
                  <span className="tools-category-tab-label">{category.label}</span>
                </button>
              );
            })}
          </nav>

          <div
            className="tools-list border border-black/[0.06] bg-white"
            onMouseLeave={() => setActiveTool(null)}
          >
            <div className="tools-list-header border-b border-black/[0.06] px-5 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/30">
                # {activeCategory.label.toLowerCase().replace(/\s+/g, "-")}
              </p>
            </div>

            <ul className="tools-list-items">
              {activeCategory.tools.map((tool, index) => {
                const isActive = activeTool?.name === tool.name;
                const isPrimary = PRIMARY_TOOLS.has(tool.name);

                return (
                  <li key={tool.name}>
                    <button
                      type="button"
                      className={[
                        "tool-row",
                        isActive ? "is-active" : "",
                        isPrimary ? "tool-row-primary" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onMouseEnter={() =>
                        setActiveTool({
                          name: tool.name,
                          description: tool.description,
                        })
                      }
                      onFocus={() =>
                        setActiveTool({
                          name: tool.name,
                          description: tool.description,
                        })
                      }
                      onBlur={() => setActiveTool(null)}
                    >
                      <span className="tool-row-index font-mono text-[10px] text-black/20">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="tool-row-name">{tool.name}</span>
                      <span className="tool-row-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          className="tools-detail mt-10 min-h-[3.25rem] border-t border-black/[0.06] pt-6"
          aria-live="polite"
        >
          {activeTool ? (
            <p className="tools-detail-text font-mono text-[12px] leading-relaxed">
              <span className="text-[#1A6B35]">{activeTool.name}</span>
              <span className="text-black/25"> — </span>
              <span className="text-black/50">{activeTool.description}</span>
            </p>
          ) : (
            <p className="tools-detail-placeholder font-mono text-[11px] text-black/25">
              {siteCopy.tools.hoverHint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
