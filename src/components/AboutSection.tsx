"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { RichText } from "@/components/RichText";
import {
  about,
  experience,
  hero,
  leadership,
  siteCopy,
} from "@/data/content";

type AboutTab = "story" | "experience" | "leadership";

const ABOUT_TABS: { id: AboutTab; label: string; count?: number }[] = [
  { id: "story", label: siteCopy.about.tabs.story },
  { id: "experience", label: siteCopy.about.tabs.experience, count: experience.length },
  {
    id: "leadership",
    label: siteCopy.about.tabs.leadership,
    count: leadership.length,
  },
];

function jobKey(company: string, period: string) {
  return `${company}-${period}`;
}

function companyInitials(company: string) {
  return company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ExternalLinkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M6.5 2.5H9.5V5.5M9 3L3.5 8.5M4.5 2.5H2.5C2.22386 2.5 2 2.72386 2 3V9.5C2 9.77614 2.22386 10 2.5 10H9C9.27614 10 9.5 9.77614 9.5 9.5V7.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardWebsiteLink({
  link,
  onClick,
  className = "",
}: {
  link: { url: string; label: string };
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={["about-site-chip", className].filter(Boolean).join(" ")}
      title={`Visit ${link.label}`}
      onClick={onClick}
    >
      <ExternalLinkIcon />
      <span className="about-site-chip-label">{link.label}</span>
    </a>
  );
}

function CompanyLogo({
  logo,
  company,
  wide = false,
}: {
  logo: string;
  company: string;
  wide?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="about-job-initials" aria-hidden>
        {companyInitials(company)}
      </span>
    );
  }

  return (
    <span
      className={[
        "about-job-logo",
        wide ? "about-job-logo--wide" : "",
      ].join(" ")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        className="about-job-logo-img"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={["about-chevron", open ? "about-chevron--open" : ""].join(" ")}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function timelineYear(period: string) {
  const match = period.match(/\b(20\d{2})\b/);
  return match?.[1] ?? period;
}

function timelineRange(period: string) {
  if (/current/i.test(period)) {
    const year = period.match(/\b(20\d{2})\b/)?.[1];
    return year ? `'${year.slice(2)}–Now` : "Now";
  }
  const parts = period.split("–").map((s) => s.trim());
  if (parts.length === 2) {
    const startYear = parts[0].match(/\b(20\d{2})\b/)?.[1];
    const endYear = parts[1].match(/\b(20\d{2})\b/)?.[1];
    if (startYear && endYear) {
      return startYear === endYear
        ? `'${startYear.slice(2)}`
        : `'${startYear.slice(2)}–'${endYear.slice(2)}`;
    }
  }
  return timelineYear(period);
}

type ExperienceTimelineProps = {
  expandedDetails: Set<string>;
  onToggleDetails: (key: string) => void;
};

function ExperienceTimeline({
  expandedDetails,
  onToggleDetails,
}: ExperienceTimelineProps) {
  const latest = experience.find((j) => j.latest) ?? experience[0];
  const defaultKey = jobKey(latest.company, latest.period);

  const [activeJobKey, setActiveJobKey] = useState(defaultKey);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());
  const isScrollingRef = useRef(false);

  const focusJob = useCallback((key: string) => {
    setActiveJobKey(key);
    isScrollingRef.current = true;
    cardRefs.current.get(key)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0]?.target.getAttribute("data-job-key");
        if (top) setActiveJobKey(top);
      },
      {
        threshold: [0.35, 0.55, 0.75],
        rootMargin: "-12% 0px -35% 0px",
      }
    );

    for (const el of cardRefs.current.values()) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-exp-timeline">
      {experience.map((job, index) => {
        const key = jobKey(job.company, job.period);
        const detailsExpanded = expandedDetails.has(key);
        const isActive = activeJobKey === key;
        const isLast = index === experience.length - 1;

        return (
          <div
            key={key}
            className={[
              "about-exp-timeline-row about-stagger-item",
              isActive ? "about-exp-timeline-row--active" : "",
            ].join(" ")}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <div className="about-exp-timeline-track">
              <button
                type="button"
                className="about-exp-timeline-node"
                aria-current={isActive ? "step" : undefined}
                aria-label={`${job.company}, ${job.period}`}
                onClick={() => focusJob(key)}
              >
                <span className="about-exp-timeline-dot" aria-hidden />
                <span className="about-exp-timeline-year">{timelineYear(job.period)}</span>
                <span className="about-exp-timeline-range">{timelineRange(job.period)}</span>
                <span className="about-exp-timeline-company">{job.company}</span>
              </button>
              {!isLast && <span className="about-exp-timeline-line" aria-hidden />}
            </div>

            <article
              ref={(el) => {
                if (el) cardRefs.current.set(key, el);
                else cardRefs.current.delete(key);
              }}
              data-job-key={key}
              className={[
                "about-card about-card--job w-full min-w-0",
                isActive ? "about-card--timeline-active" : "",
              ].join(" ")}
            >
              <div className="about-job-header-wrap">
                <div className="about-job-header">
                  <div className="about-job-header-main">
                    <div className="flex flex-wrap items-start gap-3">
                      <CompanyLogo
                        logo={job.logo}
                        company={job.company}
                        wide={job.logoWide}
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-[26px] leading-none tracking-tight">
                            {job.company}
                          </h3>
                          {job.latest && (
                            <span className="shrink-0 px-2 py-1 text-[10px] uppercase tracking-[0.12em] border border-[#1A6B35]/30 bg-[#1A6B35]/[0.04] text-[#1A6B35]">
                              {siteCopy.experience.latestTag}
                            </span>
                          )}
                        </div>
                        <p className="about-text-role">
                          {job.role}
                          {job.location ? ` · ${job.location}` : ""}
                        </p>
                        <p className="about-text-period">{job.period}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {job.website && <CardWebsiteLink link={job.website} />}
              </div>

              <div className="about-job-body">
                <div className="about-impact-stats">
                  {job.impactStats.map((stat) => (
                    <div key={stat.label} className="about-stat-badge">
                      <span className="about-stat-value">{stat.value}</span>
                      <span className="about-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="about-system-pills mt-4">
                  {job.systems.map((system) => (
                    <span key={system} className="about-system-pill">
                      {system}
                    </span>
                  ))}
                </div>

                <div className="about-job-actions mt-5">
                  <button
                    type="button"
                    className="about-expand-btn"
                    onClick={() => onToggleDetails(key)}
                    aria-expanded={detailsExpanded}
                  >
                    {detailsExpanded
                      ? siteCopy.about.whatIBuiltLess
                      : siteCopy.about.whatIBuilt}
                    <ChevronIcon open={detailsExpanded} />
                  </button>
                </div>

                {detailsExpanded && (
                  <div className="about-job-details mt-4">
                    <p className="about-text-detail mb-4">{job.highlight}</p>
                    <ul className="space-y-2">
                      {job.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="about-text-detail">
                          <span className="text-[#1A6B35]">—</span>{" "}
                          <RichText parts={bullet} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}

type AboutSectionProps = {
  isActive: boolean;
};

export function AboutSection({ isActive }: AboutSectionProps) {
  const [tab, setTab] = useState<AboutTab>("story");
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
  const [expandedLeadership, setExpandedLeadership] = useState<Set<string>>(
    new Set()
  );
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const tabsWrapRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<AboutTab, HTMLButtonElement>>(new Map());

  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current.get(tab);
    const wrap = tabsWrapRef.current;
    if (!btn || !wrap) return;
    setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [tab]);

  useLayoutEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    const wrap = tabsWrapRef.current;
    wrap?.addEventListener("scroll", updateIndicator, { passive: true });
    return () => {
      window.removeEventListener("resize", updateIndicator);
      wrap?.removeEventListener("scroll", updateIndicator);
    };
  }, [updateIndicator]);

  useEffect(() => {
    if (!isActive) return;

    function onKeyDown(e: KeyboardEvent) {
      const idx = ABOUT_TABS.findIndex((t) => t.id === tab);
      if (e.key === "ArrowRight" && idx < ABOUT_TABS.length - 1) {
        e.preventDefault();
        selectTab(ABOUT_TABS[idx + 1].id);
      } else if (e.key === "ArrowLeft" && idx > 0) {
        e.preventDefault();
        selectTab(ABOUT_TABS[idx - 1].id);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isActive, tab]);

  function selectTab(id: AboutTab) {
    setTab(id);
  }

  function toggleJobDetails(key: string) {
    setExpandedDetails((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleLeadership(key: string) {
    setExpandedLeadership((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <>
      <div className="section-intro">
        <div className="section-intro-title">
          <p className="section-label">{siteCopy.about.sectionLabel}</p>
          <h2 className="section-title">
            {siteCopy.about.headline}{" "}
            <span className="section-title-accent">
              {siteCopy.about.headlineAccent}
            </span>
          </h2>
        </div>
      </div>

      <div className="about-stage">
        <div className="about-tabs-wrap" ref={tabsWrapRef}>
          <div className="about-tabs" role="tablist" aria-label="About sections">
          {ABOUT_TABS.map(({ id, label, count }) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`about-tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`about-panel-${id}`}
              ref={(el) => {
                if (el) tabRefs.current.set(id, el);
                else tabRefs.current.delete(id);
              }}
              className={[
                "about-tab",
                tab === id ? "about-tab--active" : "",
              ].join(" ")}
              onClick={() => selectTab(id)}
            >
              {label}
              {count !== undefined && (
                <span className="about-tab-count"> · {count}</span>
              )}
            </button>
          ))}
        </div>
        <div
          className="about-tab-indicator"
          style={{
            width: indicator.width,
            transform: `translateX(${indicator.left}px)`,
          }}
          aria-hidden
        />
        </div>

      {tab === "story" && (
        <div
          id="about-panel-story"
          role="tabpanel"
          aria-labelledby="about-tab-story"
          className="about-tab-panel"
        >
          <div className="about-stagger">
            <blockquote className="about-pull-quote about-stagger-item">
              <p className="about-pull-quote-text">{about.pullQuote}</p>
              <footer className="about-pull-quote-context">
                {about.pullQuoteContext}
              </footer>
            </blockquote>

            <div className="grid gap-6 md:grid-cols-2 mb-6 about-stagger-item">
              <div className="about-story-card">
                <p className="about-text-body">
                  {about.shortBio}
                </p>
              </div>
              <div className="about-story-card">
                <p className="section-label">
                  {siteCopy.about.currentlyIntoLabel}
                </p>
                <ul className="mt-4 space-y-0">
                  {hero.currentlyInto.map((item) => (
                    <li key={item.title} className="about-into-item">
                      <span className="about-into-title">{item.title}</span>
                      <span className="about-into-tags">
                        {item.tags.join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 about-stagger-item">
              <div className="about-story-card about-story-bio">
                <p className="about-text-mono">
                  <RichText parts={about.bioStrip} />
                </p>
              </div>
              <div className="about-story-card">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {about.bioPills.green.map((pill) => (
                      <span
                        key={pill}
                        className="px-3 py-1.5 text-xs border border-[#1A6B35]/30 bg-[#1A6B35]/[0.04] text-[#1A6B35]"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                  {about.bioPills.muted.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-wrap gap-2">
                      {row.map((pill) => (
                        <span
                          key={pill}
                          className="px-3 py-1.5 text-xs border border-black/[0.12] text-[rgba(13,13,13,0.62)]"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "experience" && (
        <div
          id="about-panel-experience"
          role="tabpanel"
          aria-labelledby="about-tab-experience"
          className="about-tab-panel about-exp-panel"
        >
          <div className="about-exp-shell">
            <ExperienceTimeline
              expandedDetails={expandedDetails}
              onToggleDetails={toggleJobDetails}
            />

            <a
              href={about.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="about-resume-link about-exp-panel-footer mt-8 inline-block about-stagger-item"
            >
              {siteCopy.about.resumeLink}
            </a>
          </div>
        </div>
      )}

      {tab === "leadership" && (
        <div
          id="about-panel-leadership"
          role="tabpanel"
          aria-labelledby="about-tab-leadership"
          className="about-tab-panel"
        >
          <div className="grid gap-4 md:grid-cols-2 about-stagger">
            {leadership.map((entry, index) => {
              const key = `${entry.title}-${entry.period}`;
              const isExpanded = expandedLeadership.has(key);

              return (
                <article
                  key={key}
                  className={[
                    "about-card about-card--leadership about-stagger-item",
                    entry.featured ? "about-card--leadership-featured" : "",
                  ].join(" ")}
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <div className="about-leadership-header">
                    <div className="min-w-0">
                      <h3 className="font-display text-[22px] leading-tight tracking-tight">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#1A6B35]">
                        {entry.organization}
                      </p>
                      <p className="about-text-caption">{entry.period}</p>
                    </div>
                    {entry.website && <CardWebsiteLink link={entry.website} />}
                  </div>

                  <div className="about-stat-badges mt-4">
                    {entry.stats.map((stat) => (
                      <div key={stat.label} className="about-stat-badge">
                        <span className="about-stat-value">{stat.value}</span>
                        <span className="about-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className={[
                      "about-accordion-body about-accordion-body--inline",
                      isExpanded ? "about-accordion-body--open" : "",
                    ].join(" ")}
                  >
                    <div className="about-accordion-body-inner">
                      <p className="about-text-detail">
                        <RichText parts={entry.description} />
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="about-expand-btn mt-auto pt-4"
                    onClick={() => toggleLeadership(key)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded
                      ? siteCopy.about.readLess
                      : siteCopy.about.readMore}
                    <ChevronIcon open={isExpanded} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
