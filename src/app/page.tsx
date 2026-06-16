"use client";

import { useState, useRef, useEffect } from "react";
import { SkillsGrid } from "@/components/SkillsGrid";
import { ToolsSection } from "@/components/ToolsSection";
import { GitHubFeed } from "@/components/GitHubFeed";
import { ChatInlineStats } from "@/components/ChatInlineStats";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import {
  about,
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

const PAGE_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "tools", label: "Tools" },
  { id: "github", label: "GitHub" },
  { id: "chat", label: "Chat" },
  { id: "contact", label: "Contact" },
] as const;

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: siteCopy.chat.openingMessage },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
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
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef("hero");

  const activeIndex = PAGE_SECTIONS.findIndex((s) => s.id === activeSection);
  const sectionNumber = String(Math.max(activeIndex + 1, 1)).padStart(2, "0");
  const isDarkUi = activeSection === "github" || activeSection === "contact";

  function scrollToId(id: string) {
    activeSectionRef.current = id;
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      setScrollProgress(maxScroll > 0 ? (container.scrollTop / maxScroll) * 100 : 0);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const video = heroVideoRef.current;
    if (!container || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = () => {
      const heroEl = document.getElementById("hero");
      if (!heroEl) return;
      const heroScroll = Math.max(0, -heroEl.getBoundingClientRect().top);
      video.style.transform = `translateY(${heroScroll * 0.4}px)`;
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const ids = PAGE_SECTIONS.map((s) => s.id);
    const visibleRatios = new Map<string, number>();

    const updateSectionClasses = (nextId: string) => {
      const prevId = activeSectionRef.current;
      if (prevId === nextId) return;

      ids.forEach((id) => {
        document.getElementById(id)?.classList.remove("section-active", "section-leaving");
      });

      if (prevId) {
        document.getElementById(prevId)?.classList.add("section-leaving");
      }
      document.getElementById(nextId)?.classList.add("section-active");

      activeSectionRef.current = nextId;
      setActiveSection(nextId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId = activeSectionRef.current;
        let bestRatio = 0;
        visibleRatios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestRatio > 0) {
          updateSectionClasses(bestId);
        }
      },
      { root: container, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    document.getElementById("hero")?.classList.add("section-active");

    return () => observer.disconnect();
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
        body: JSON.stringify({ message, history }),
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
        setHistory((prev) => [
          ...prev,
          { role: "user", content: message },
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
    <div
      className={[
        "portfolio-page",
        isDarkUi ? "is-dark-ui" : "",
        activeSection === "contact" ? "is-section-contact" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className="site-nav">
        <div className="section-content py-4 flex items-center justify-between gap-6">
          <button
            onClick={() => scrollToId("hero")}
            className="site-nav-name text-[#1A6B35] tracking-tight font-semibold hover:opacity-80 transition-opacity cursor-pointer shrink-0"
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
          </nav>

          <div className="site-nav-availability flex items-center gap-2 text-sm text-[#1A6B35] shrink-0">
            <span className="hero-nav-pulse w-2 h-2 rounded-full bg-[#1A6B35]" />
            {about.availability}
          </div>
        </div>
      </header>

      <nav className="section-nav-dots" aria-label="Section navigation">
        {PAGE_SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            aria-label={`Go to ${section.label}`}
            aria-current={activeSection === section.id ? "true" : undefined}
            onClick={() => scrollToId(section.id)}
            className={[
              "section-nav-dot",
              activeSection === section.id ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </nav>

      <div className="section-counter" aria-live="polite">
        {sectionNumber} / {String(PAGE_SECTIONS.length).padStart(2, "0")}
      </div>

      <div ref={scrollContainerRef} className="snap-scroll">
        {/* Hero */}
        <section id="hero" className="snap-section snap-section--cream section-active">
          <div className="section-panel section-panel--flush !p-0 min-h-screen flex flex-col">
            <div className="hero-video-block relative flex-1 min-h-0 overflow-hidden">
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
              <div className="relative z-[2] mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12 pt-24">
                <div className="flex flex-wrap items-center gap-3 text-xs">
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

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => scrollToId("projects")}
                    className="inline-flex items-center justify-center px-5 py-3 bg-[#1A6B35] text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    → View Projects
                  </button>
                  <button
                    onClick={() => scrollToId("chat")}
                    className="inline-flex items-center justify-center px-5 py-3 border border-white/40 text-white text-sm hover:border-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    → Chat with my AI
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-marquee shrink-0 overflow-hidden bg-[#1A6B35] py-3">
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
          </div>
        </section>

        {/* About */}
        <section id="about" className="snap-section snap-section--cream">
          <div className="section-panel section-panel--start">
            <div className="section-content">
              <AboutSection isActive={activeSection === "about"} />
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="snap-section snap-section--white">
          <div className="section-panel section-panel--start section-panel--projects flex flex-col gap-6">
            <ProjectsSection />
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="snap-section snap-section--cream">
          <div className="section-panel section-panel--start flex flex-col gap-8">
            <div className="section-content">
              <div className="section-intro">
                <div className="section-intro-title">
                  <p className="section-label">{siteCopy.skills.sectionLabel}</p>
                  <h2 className="section-title">
                    {siteCopy.skills.headline}{" "}
                    <span className="section-title-accent">
                      {siteCopy.skills.headlineAccent}
                    </span>
                  </h2>
                </div>
                <p className="section-intro-meta">{siteCopy.skills.hoverHint}</p>
              </div>
            </div>
            <SkillsGrid />
          </div>
        </section>

        {/* Tools */}
        <section id="tools" className="snap-section snap-section--white">
          <div className="section-panel section-panel--start flex flex-col gap-8">
            <div className="section-content">
              <div className="section-intro">
                <div className="section-intro-title">
                  <p className="section-label">{siteCopy.tools.sectionLabel}</p>
                  <h2 className="section-title">
                    {siteCopy.tools.headline}{" "}
                    <span className="section-title-accent">
                      {siteCopy.tools.headlineAccent}
                    </span>
                  </h2>
                </div>
                <p className="section-intro-meta">{siteCopy.tools.hoverHint}</p>
              </div>
            </div>
            <ToolsSection />
          </div>
        </section>

        {/* GitHub */}
        <section id="github" className="snap-section snap-section--dark">
          <div className="section-panel section-panel--start flex flex-col gap-8">
            <div className="section-content">
              <div className="section-intro section-intro-minimal">
                <p className="section-label">{siteCopy.github.sectionLabel}</p>
                <div className="section-intro-meta flex items-center gap-2 text-[#3ECF6A]">
                  <span className="hero-nav-pulse w-2 h-2 rounded-full bg-[#3ECF6A]" />
                  {siteCopy.github.liveLabel}
                </div>
              </div>
            </div>
            <GitHubFeed />
          </div>
        </section>

        {/* Chat */}
        <section id="chat" className="snap-section snap-section--cream">
          <div className="section-panel section-panel--start section-panel--chat">
            <div className="section-content">
              <div className="section-intro section-intro--compact">
                <div className="section-intro-title">
                  <p className="section-label">{siteCopy.chat.sectionLabel}</p>
                  <h2 className="section-title">
                    {siteCopy.chat.headline}{" "}
                    <span className="section-title-accent">
                      {siteCopy.chat.headlineAccent}
                    </span>
                  </h2>
                </div>
                <p className="section-intro-meta">
                  {siteCopy.chat.description}
                </p>
              </div>

              <div className="chat-shell mt-6">
                <div className="chat-shell-header shrink-0">
                  <p className="chat-shell-title">{siteCopy.chat.terminalTitle}</p>
                  <div className="hidden sm:block">
                    <ChatInlineStats refreshKey={messages.length} />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="chat-ai-pulse w-1.5 h-1.5 rounded-full bg-[#1A6B35]" />
                    <span className="chat-section-label text-[#1A6B35]">live</span>
                  </div>
                </div>

                <div className="chat-panel min-h-0 overflow-hidden">
                  <div
                    ref={chatScrollRef}
                    className="chat-messages min-h-0 px-6 py-8 bg-white"
                  >
                    <div className="flex flex-col gap-6 max-w-3xl">
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`chat-message flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                        >
                          {msg.role === "assistant" && (
                            <span className="chat-section-label mb-2 text-[#1A6B35]">
                              {siteCopy.chat.aiLabel}
                            </span>
                          )}
                          <div
                            className={`max-w-[90%] px-5 py-4 text-[15px] leading-relaxed whitespace-pre-wrap ${
                              msg.role === "user"
                                ? "bg-[#1A6B35] text-white"
                                : "bg-[#F5F5F0] text-[#0D0D0D] border border-black/[0.08] border-l-4 border-l-[#1A6B35]"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {loading && (
                        <div className="chat-message flex flex-col items-start">
                          <span className="chat-section-label mb-2 text-[#1A6B35]">
                            {siteCopy.chat.aiLabel}
                          </span>
                          <div className="bg-[#F5F5F0] border border-black/[0.08] border-l-4 border-l-[#1A6B35] px-5 py-4 flex gap-1.5">
                            <span className="chat-typing-dot w-2 h-2 rounded-full bg-[#1A6B35]" />
                            <span className="chat-typing-dot w-2 h-2 rounded-full bg-[#1A6B35]" />
                            <span className="chat-typing-dot w-2 h-2 rounded-full bg-[#1A6B35]" />
                          </div>
                        </div>
                      )}
                      {messages.length === 1 && !loading && (
                        <div className="mt-2 flex flex-col gap-3 max-w-xl">
                          <p className="chat-section-label">
                            {siteCopy.chat.startWithLabel}
                          </p>
                          {siteCopy.chat.suggestedPrompts.map((prompt) => (
                            <button
                              key={prompt}
                              type="button"
                              onClick={() => handleSend(prompt)}
                              className="chat-starter"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  <div className="chat-composer shrink-0 border-t border-black/[0.08] px-6 py-4 bg-[#F5F5F0]">
                    <div className="flex items-center gap-3 max-w-3xl">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={siteCopy.chat.placeholder}
                        className="flex-1 bg-white border border-black/[0.12] px-4 py-3.5 text-[15px] text-[#0D0D0D] placeholder:text-black/30 outline-none focus:border-[#1A6B35]"
                      />
                      <button
                        type="button"
                        onClick={() => handleSend()}
                        disabled={!input.trim() || loading}
                        className="shrink-0 px-6 py-3.5 bg-[#1A6B35] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {siteCopy.chat.sendLabel}
                      </button>
                    </div>
                    <p className="chat-shell-title mt-3 max-w-3xl">
                      {siteCopy.chat.poweredBy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="snap-section snap-section--green">
          <div className="section-panel flex flex-col justify-between min-h-screen">
            <div className="section-content flex-1">
              <p className="contact-section-label section-label">
                {siteCopy.contact.label}
              </p>
              <a
                href={`mailto:${about.email}`}
                className="contact-email mt-4 inline-block hover:opacity-90 transition-opacity"
              >
                {about.email}
              </a>
              <div className="mt-6 flex flex-wrap gap-6">
                {siteCopy.contact.links.map((link) => {
                  const href = about[link.key];
                  const isExternal =
                    href.startsWith("http") || link.key === "resume";

                  return (
                    <a
                      key={link.key}
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="contact-link"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              <p className="mt-10 mb-6 text-[10px] uppercase tracking-[0.12em] text-white/40">
                Or send a message
              </p>

              <form
                onSubmit={handleContactSubmit}
                className="flex max-w-[480px] flex-col gap-5"
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
                  <label htmlFor="contact-name" className="contact-form-label-light">
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
                    className="contact-form-input-light"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="contact-form-label-light">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Your email"
                    className="contact-form-input-light"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="contact-form-label-light">
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
                    className="contact-form-input-light resize-none"
                  />
                </div>

                <div>
                  <span className="contact-form-label-light">Type</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {CONTACT_TYPE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setContactType(option.value)}
                        className={[
                          "contact-type-pill-light cursor-pointer",
                          contactType === option.value ? "is-selected" : "",
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
                  className="contact-form-submit-light disabled:opacity-60 disabled:cursor-default cursor-pointer"
                >
                  {contactSubmitting ? "Sending..." : "→ Send message"}
                </button>

                {contactSuccess && (
                  <p className="font-mono text-[12px] text-white/90">
                    Got it — I&apos;ll be in touch soon.
                  </p>
                )}
                {contactError && (
                  <p className="font-mono text-[12px] text-red-200">
                    Something went wrong — try emailing me directly.
                  </p>
                )}
              </form>
            </div>

            <footer className="section-content flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-10 mt-10">
              <p className="contact-footer-text">
                {siteCopy.footer.copyright(about.name, about.year)}
              </p>
              <p className="contact-footer-text">{siteCopy.footer.builtWith}</p>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}