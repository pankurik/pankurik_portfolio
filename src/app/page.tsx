"use client";

import { useState, useRef, useEffect } from "react";
import { SkillsGrid } from "@/components/SkillsGrid";
import { GitHubFeed } from "@/components/GitHubFeed";
import { ChatStatsPanel } from "@/components/ChatStatsPanel";
import { ProjectsSection } from "@/components/ProjectsSection";
import { RichText } from "@/components/RichText";
import {
  about,
  experience,
  leadership,
  hero,
  siteCopy,
} from "@/data/content";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type ContactType = "hiring" | "collaboration" | "other";

const CONTACT_TYPE_OPTIONS: {
  value: ContactType;
  label: string;
}[] = [
  { value: "hiring", label: "I'm hiring" },
  { value: "collaboration", label: "Collaboration" },
  { value: "other", label: "Other" },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: siteCopy.chat.openingMessage },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactType, setContactType] = useState<ContactType>("other");
  const [contactWebsite, setContactWebsite] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;
      const maxScroll = scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = () => {
      video.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [
      "top",
      "projects",
      "about",
      "skills",
      "github",
      "chat",
      "contact",
    ];
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let bestId = "top";
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestRatio > 0) setActiveSection(bestId);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-80px 0px -45% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("scroll-visible");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll(".scroll-hidden").forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observeAll = () => {
      document
        .querySelectorAll(".scroll-hidden:not(.scroll-visible)")
        .forEach((el) => observer.observe(el));
    };

    observeAll();
    const frame = requestAnimationFrame(observeAll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  async function handleSend(text?: string) {
    const message = text ?? input.trim();
    if (!message || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong. Try again?" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactSuccess(false);
    setContactError(false);
    setContactSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          type: contactType,
          website: contactWebsite,
        }),
      });

      if (!res.ok) {
        throw new Error("Contact submission failed");
      }

      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setContactWebsite("");
      setContactType("other");
    } catch {
      setContactError(true);
    } finally {
      setContactSubmitting(false);
    }
  }

  return (
    <div className="portfolio-page min-h-screen">
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className="site-nav">
        <div className="section-content py-4 flex items-center justify-between gap-6">
          <button
            onClick={() => scrollToId("top")}
            className="text-[#1A6B35] tracking-tight font-semibold hover:opacity-80 transition-opacity cursor-pointer shrink-0"
          >
            {about.name}
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm text-black/30">
            {siteCopy.nav.links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToId(link.href)}
                className={[
                  "site-nav-link hover:text-black/60 transition-colors cursor-pointer",
                  activeSection === link.href ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {link.label}
              </button>
            ))}
            <a
              href={about.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black/60 transition-colors"
            >
              GitHub
            </a>
          </nav>

          <div className="flex items-center gap-2 text-sm text-[#1A6B35] shrink-0">
            <span className="hero-nav-pulse w-2 h-2 rounded-full bg-[#1A6B35]" />
            {about.availability}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="hero-light flex flex-col">
        <div className="flex flex-col w-full">
          <div className="hero-video-block relative min-h-[70vh] w-full overflow-hidden">
            <video
              ref={heroVideoRef}
              src="/BayArea.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 z-0 h-full w-full object-cover will-change-transform"
            />
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 100%)",
              }}
            />
            <div className="relative z-[2] mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-6 pb-10 pt-10 md:pt-14">
              <div className="scroll-hidden scroll-from-bottom scroll-stagger-100 flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full border border-white/50 px-3 py-1 text-white">
                  {about.title}
                </span>
                <span className="text-white/60">{about.location}</span>
                <span className="text-white/60">{about.year}</span>
              </div>

              <h1 className="mt-8 font-display leading-[0.85] tracking-tight text-[clamp(72px,12vw,148px)]">
                <span className="hero-headline-line block">
                  <span className="hero-headline-line-inner hero-headline-delay-1 block text-white">
                    I BUILD
                  </span>
                </span>
                <span className="hero-headline-line block">
                  <span className="hero-headline-line-inner hero-headline-delay-2 flex items-end gap-6 flex-wrap">
                    <span className="hero-headline-outline-video">THINGS</span>
                    <span className="font-sans text-[11px] text-white/50 pb-3 tracking-normal normal-case">
                      {hero.headlineMeta}
                    </span>
                  </span>
                </span>
                <span className="hero-headline-line block">
                  <span className="hero-headline-line-inner hero-headline-delay-3 block">
                    <span className="text-white">THAT </span>
                    <span className="text-[#3ECF6A]">HOLD.</span>
                  </span>
                </span>
              </h1>
            </div>
          </div>

          <div className="w-full">
            <div className="hero-marquee overflow-hidden bg-[#1A6B35] py-3">
              <div className="hero-marquee-track">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="hero-marquee-content flex shrink-0">
                    {hero.marqueeItems.map((item) => (
                      <span
                        key={`${i}-${item}`}
                        className="font-display text-[22px] text-white px-8 whitespace-nowrap"
                      >
                        {item} ·
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-2">
              <div className="scroll-hidden scroll-from-bottom scroll-stagger-100">
                <p className="text-sm leading-relaxed text-black/60">
                  {about.shortBio}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => scrollToId("projects")}
                    className="inline-flex items-center justify-center px-5 py-3 bg-[#1A6B35] text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    → View Projects
                  </button>
                  <button
                    onClick={() => scrollToId("chat")}
                    className="inline-flex items-center justify-center px-5 py-3 border border-[#0D0D0D]/20 text-[#0D0D0D] text-sm hover:border-[#1A6B35] hover:text-[#1A6B35] transition-colors cursor-pointer"
                  >
                    → Chat with my AI
                  </button>
                </div>
              </div>

              <div className="scroll-hidden scroll-from-bottom scroll-stagger-100" style={{ "--scroll-stagger-index": 1 } as React.CSSProperties}>
                <p className="section-label">Currently into</p>
                <ul className="mt-4 space-y-0">
                  {hero.currentlyInto.map((item, itemIndex) => (
                    <li
                      key={item.title}
                      className="scroll-hidden scroll-from-bottom scroll-stagger-100 flex items-baseline justify-between gap-4 py-3 border-b border-black/[0.06] text-sm"
                      style={{ "--scroll-stagger-index": itemIndex + 2 } as React.CSSProperties}
                    >
                      <span className="text-black/70">{item.title}</span>
                      <span className="text-[#1A6B35] text-right shrink-0">
                        {item.tags.join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />

      {/* About */}
      <section id="about" className="portfolio-section">
        <div className="section-content">
          <div className="section-intro scroll-hidden scroll-from-bottom scroll-stagger-100">
            <div className="section-intro-title">
              <p className="section-label">{siteCopy.about.sectionLabel}</p>
              <h2 className="section-title">
                {siteCopy.about.headline}{" "}
                <span className="section-title-accent">{siteCopy.about.headlineAccent}</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <p className="scroll-hidden scroll-from-bottom scroll-stagger-100 font-mono text-sm leading-[1.9] text-black/55">
              <RichText parts={about.bioStrip} />
            </p>
            <div className="scroll-hidden scroll-from-bottom scroll-stagger-100 space-y-3" style={{ "--scroll-stagger-index": 1 } as React.CSSProperties}>
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
                      className="px-3 py-1.5 text-xs border border-black/[0.12] text-black/45"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="section-subblock">
            <p className="scroll-hidden scroll-from-bottom scroll-stagger-100 section-label mb-8">{siteCopy.experience.label}</p>
            <div className="space-y-12">
              {experience.map((job, jobIndex) => (
                <div
                  key={`${job.company}-${job.period}`}
                  className="scroll-hidden scroll-from-left scroll-stagger-150 grid gap-x-10"
                  style={{
                    gridTemplateColumns: "160px 1px 1fr",
                    "--scroll-stagger-index": jobIndex,
                  } as React.CSSProperties}
                >
                  <div>
                    <p className="font-mono text-[11px] text-black/40 leading-relaxed">
                      {job.period}
                    </p>
                    {job.latest && (
                      <span className="mt-2 inline-block px-2 py-1 text-[10px] uppercase tracking-[0.12em] border border-[#1A6B35]/30 bg-[#1A6B35]/[0.04] text-[#1A6B35]">
                        {siteCopy.experience.latestTag}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/[0.08]" />
                    <div
                      className={[
                        "absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full",
                        job.latest
                          ? "bg-[#1A6B35]"
                          : "bg-white border border-black/20",
                      ].join(" ")}
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-[28px] leading-none tracking-tight">
                      {job.company}
                    </h3>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#1A6B35]">
                      {job.role}
                      {job.employmentType ? ` · ${job.employmentType}` : ""}
                      {job.location ? ` · ${job.location}` : ""}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {job.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="text-[11px] leading-relaxed text-black/45"
                        >
                          <span className="text-[#1A6B35]">—</span>{" "}
                          <RichText parts={bullet} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-subblock">
            <p className="scroll-hidden scroll-from-bottom scroll-stagger-100 section-label mb-8">{siteCopy.leadership.label}</p>
            <div className="grid gap-4 md:grid-cols-3">
              {leadership.map((entry, entryIndex) => (
                <article
                  key={`${entry.title}-${entry.period}`}
                  className="scroll-hidden scroll-from-bottom scroll-stagger-100 border-[0.5px] border-black/[0.08] p-5 transition-colors hover:border-[#1A6B35]/30"
                  style={{ "--scroll-stagger-index": entryIndex } as React.CSSProperties}
                >
                  <h3 className="font-display text-[22px] leading-tight tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#1A6B35]">
                    {entry.organization}
                  </p>
                  <p className="mt-1 text-[10px] text-black/35">{entry.period}</p>
                  <p className="mt-3 text-[11px] leading-relaxed text-black/45">
                    <RichText parts={entry.description} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="portfolio-section pt-0">
        <div className="section-content">
          <div className="section-intro section-intro-minimal scroll-hidden scroll-from-bottom scroll-stagger-100">
            <p className="section-label">{siteCopy.skills.sectionLabel}</p>
            <p className="section-intro-meta">{siteCopy.skills.hoverHint}</p>
          </div>
        </div>

        <SkillsGrid />
      </section>

      {/* GitHub */}
      <section id="github" className="portfolio-section pt-0">
        <div className="section-content">
          <div className="section-intro section-intro-minimal scroll-hidden scroll-from-bottom scroll-stagger-100">
            <p className="section-label">{siteCopy.github.sectionLabel}</p>
            <div className="section-intro-meta flex items-center gap-2 text-[#1A6B35]">
              <span className="hero-nav-pulse w-2 h-2 rounded-full bg-[#1A6B35]" />
              {siteCopy.github.liveLabel}
            </div>
          </div>
        </div>

        <div className="scroll-hidden scroll-from-bottom scroll-stagger-100">
          <GitHubFeed />
        </div>
      </section>

      {/* Chat */}
      <section id="chat" className="portfolio-section min-h-[85vh] flex flex-col pb-0">
        <div className="section-content">
          <div className="section-intro scroll-hidden scroll-from-bottom scroll-stagger-100">
            <div className="section-intro-title">
              <p className="section-label">{siteCopy.chat.sectionLabel}</p>
              <h2 className="section-title">
                {siteCopy.chat.headline}{" "}
                <span className="section-title-accent">{siteCopy.chat.headlineAccent}</span>
              </h2>
            </div>
            <p className="section-intro-meta lg:text-right scroll-hidden scroll-from-bottom scroll-stagger-100" style={{ "--scroll-stagger-index": 1 } as React.CSSProperties}>{siteCopy.chat.description}</p>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 min-h-0 border-t border-black/[0.06]">
          <div className="scroll-hidden scroll-from-left scroll-stagger-100 flex flex-col min-h-[70vh] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-black/[0.08]">
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-5">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="mb-2 flex items-center gap-2">
                        <span className="chat-ai-pulse w-1.5 h-1.5 rounded-full bg-[#1A6B35]" />
                        <span className="chat-section-label text-[#1A6B35]">
                          {siteCopy.chat.aiLabel}
                        </span>
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-[#1A6B35] text-white"
                          : "bg-white text-[#0D0D0D] border border-black/[0.12]"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex flex-col items-start">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="chat-ai-pulse w-1.5 h-1.5 rounded-full bg-[#1A6B35]" />
                      <span className="chat-section-label text-[#1A6B35]">
                        {siteCopy.chat.aiLabel}
                      </span>
                    </div>
                    <div className="bg-white border border-black/[0.12] px-4 py-3 flex gap-1.5">
                      <span className="chat-typing-dot w-2 h-2 rounded-full bg-[#1A6B35]" />
                      <span className="chat-typing-dot w-2 h-2 rounded-full bg-[#1A6B35]" />
                      <span className="chat-typing-dot w-2 h-2 rounded-full bg-[#1A6B35]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-black/[0.08] px-6 py-4 bg-[#F5F5F0]">
              <div className="flex flex-wrap gap-2 mb-4">
                {siteCopy.chat.suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="px-3 py-1.5 text-xs border border-[#1A6B35] text-[#1A6B35] hover:bg-[#1A6B35] hover:text-white transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={siteCopy.chat.placeholder}
                  className="flex-1 bg-white border border-black/[0.12] px-4 py-3 text-sm text-[#0D0D0D] placeholder:text-black/30 outline-none focus:border-[#1A6B35]"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="shrink-0 px-5 py-3 bg-[#1A6B35] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  {siteCopy.chat.sendLabel}
                </button>
              </div>
              <p className="text-xs text-black/25 mt-3">{siteCopy.chat.poweredBy}</p>
            </div>
          </div>

          <div className="scroll-hidden scroll-from-right scroll-stagger-100 h-full min-h-[70vh] lg:min-h-0">
            <ChatStatsPanel />
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio-section border-t border-black/[0.06]">
        <div className="section-content">
            <p className="scroll-hidden scroll-from-bottom scroll-stagger-100 section-label">{siteCopy.contact.label}</p>
            <a
              href={`mailto:${about.email}`}
              className="scroll-hidden scroll-from-bottom scroll-stagger-100 mt-4 inline-block font-display text-[clamp(32px,6vw,42px)] leading-none text-[#1A6B35] hover:opacity-80 transition-opacity"
              style={{ "--scroll-stagger-index": 1 } as React.CSSProperties}
            >
              {about.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-6">
              {siteCopy.contact.links.map((link, linkIndex) => {
                const href = about[link.key];
                const isExternal =
                  href.startsWith("http") || link.key === "resume";

                return (
                <a
                  key={link.key}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="scroll-hidden scroll-from-bottom scroll-stagger-100 font-mono text-[11px] text-black/45 hover:text-[#1A6B35] transition-colors"
                  style={{ "--scroll-stagger-index": linkIndex + 2 } as React.CSSProperties}
                >
                  {link.label}
                </a>
                );
              })}
            </div>

            <p className="scroll-hidden scroll-from-bottom scroll-stagger-100 mt-8 mb-6 text-[10px] uppercase tracking-[0.12em] text-black/25" style={{ "--scroll-stagger-index": 5 } as React.CSSProperties}>
              Or send a message
            </p>

            <form
              onSubmit={handleContactSubmit}
              className="scroll-hidden scroll-from-bottom scroll-stagger-100 flex max-w-[480px] flex-col gap-5"
              style={{ "--scroll-stagger-index": 6 } as React.CSSProperties}
            >
              <input
                type="text"
                name="website"
                value={contactWebsite}
                onChange={(e) => setContactWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label htmlFor="contact-name" className="contact-form-label">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  maxLength={100}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your name"
                  className="contact-form-input"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="contact-form-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Your email"
                  className="contact-form-input"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="contact-form-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  maxLength={1000}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  className="contact-form-input resize-none"
                />
              </div>

              <div>
                <span className="contact-form-label">Type</span>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_TYPE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setContactType(option.value)}
                      className={[
                        "px-3 py-1.5 font-mono text-[11px] transition-colors cursor-pointer",
                        contactType === option.value
                          ? "bg-[#1A6B35] text-white border border-[#1A6B35]"
                          : "bg-transparent text-black/45 border border-black/20 hover:border-[#1A6B35]/40",
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={contactSubmitting}
                className="w-full bg-[#1A6B35] px-4 py-[0.85rem] font-mono text-[11px] tracking-[0.08em] text-white hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-default cursor-pointer"
              >
                {contactSubmitting ? "Sending..." : "→ Send message"}
              </button>

              {contactSuccess && (
                <p className="contact-form-feedback font-mono text-[12px] text-[#1A6B35]">
                  Got it — I&apos;ll be in touch soon.
                </p>
              )}
              {contactError && (
                <p className="contact-form-feedback font-mono text-[12px] text-red-600">
                  Something went wrong — try emailing me directly.
                </p>
              )}
            </form>
        </div>

        <footer className="scroll-hidden scroll-from-bottom scroll-stagger-100 section-content flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-black/[0.06] pt-6 mt-10">
          <p className="text-[10px] text-black/35">
            {siteCopy.footer.copyright(about.name, about.year)}
          </p>
          <p className="text-[10px] text-black/35">{siteCopy.footer.builtWith}</p>
        </footer>
      </section>
    </div>
  );
}
