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

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: siteCopy.chat.openingMessage },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section
        id="top"
        className="hero-light min-h-screen flex flex-col bg-[#F5F5F0] text-[#0D0D0D]"
      >
        <header className="border-b border-black/[0.08]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
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
                  className="hover:text-black/60 transition-colors cursor-pointer"
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

        <div className="flex-1 flex flex-col justify-between w-full">
          <div className="max-w-6xl mx-auto w-full px-6 pt-10 md:pt-14">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 border border-[#1A6B35] text-[#1A6B35] rounded-full">
                {about.title}
              </span>
              <span className="text-black/40">{about.location}</span>
              <span className="text-black/40">{about.year}</span>
            </div>

            <h1 className="mt-8 font-display leading-[0.85] tracking-tight text-[clamp(72px,12vw,148px)]">
              <span className="hero-headline-line block">
                <span className="hero-headline-line-inner hero-headline-delay-1 block text-[#0D0D0D]">
                  I BUILD
                </span>
              </span>
              <span className="hero-headline-line block">
                <span className="hero-headline-line-inner hero-headline-delay-2 flex items-end gap-6 flex-wrap">
                  <span className="hero-headline-outline">THINGS</span>
                  <span className="font-sans text-[11px] text-black/30 pb-3 tracking-normal normal-case">
                    {hero.headlineMeta}
                  </span>
                </span>
              </span>
              <span className="hero-headline-line block">
                <span className="hero-headline-line-inner hero-headline-delay-3 block">
                  <span className="text-[#0D0D0D]">THAT </span>
                  <span className="text-[#1A6B35]">HOLD.</span>
                </span>
              </span>
            </h1>
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

            <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
              <div>
                <p className="hero-section-label">About</p>
                <p className="mt-4 text-sm leading-relaxed text-black/60">
                  {about.shortBio}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => scrollToId("chat")}
                    className="inline-flex items-center justify-center px-5 py-3 bg-[#1A6B35] text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    → Chat with my AI
                  </button>
                  <button
                    onClick={() => scrollToId("projects")}
                    className="inline-flex items-center justify-center px-5 py-3 border border-[#0D0D0D]/20 text-[#0D0D0D] text-sm hover:border-[#1A6B35] hover:text-[#1A6B35] transition-colors cursor-pointer"
                  >
                    → View Projects
                  </button>
                </div>
              </div>

              <div>
                <p className="hero-section-label">Currently into</p>
                <ul className="mt-4 space-y-0">
                  {hero.currentlyInto.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-baseline justify-between gap-4 py-3 border-b border-black/[0.06] text-sm"
                    >
                      <span className="text-black/70">{item.title}</span>
                      <span className="text-[#1A6B35] text-right shrink-0">
                        {item.tags.join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="hero-section-label">Selected work</p>
                <ul className="mt-4 space-y-0">
                  {hero.selectedWork.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-baseline justify-between gap-4 py-3 border-b border-black/[0.06] text-sm"
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

      {/* Chat */}
      <section id="chat" className="min-h-screen flex flex-col bg-[#F5F5F0] text-[#0D0D0D]">
        <div className="border-b border-black/[0.08] px-6 py-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="chat-section-label">{siteCopy.chat.sectionLabel}</p>
              <h2 className="mt-2 font-display text-[clamp(40px,8vw,64px)] leading-[0.95] tracking-tight text-[#0D0D0D]">
                {siteCopy.chat.headline}{" "}
                <span className="text-[#1A6B35]">{siteCopy.chat.headlineAccent}</span>
              </h2>
            </div>
            <p className="max-w-sm text-xs text-black/40 leading-relaxed lg:text-right">
              {siteCopy.chat.description}
            </p>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-2 min-h-0">
          <div className="flex flex-col min-h-[70vh] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-black/[0.08]">
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

          <ChatStatsPanel />
        </div>
      </section>

      <ProjectsSection />

      {/* Skills */}
      <section id="skills" className="bg-[#F5F5F0] text-[#0D0D0D]">
        <div className="border-b border-black/[0.08] px-6 py-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="chat-section-label">{siteCopy.skills.sectionLabel}</p>
              <h2 className="mt-2 font-display text-[clamp(40px,8vw,64px)] leading-[0.95] tracking-tight">
                {siteCopy.skills.headline}{" "}
                <span className="text-[#1A6B35]">{siteCopy.skills.headlineAccent}</span>
              </h2>
            </div>
            <p className="max-w-xs text-xs text-black/40 leading-relaxed sm:text-right">
              {siteCopy.skills.hoverHint}
            </p>
          </div>
        </div>

        <SkillsGrid />
      </section>

      {/* GitHub */}
      <section className="bg-[#F5F5F0] text-[#0D0D0D]">
        <div className="border-b border-black/[0.08] px-6 py-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="chat-section-label">{siteCopy.github.sectionLabel}</p>
              <h2 className="mt-2 font-display text-[clamp(40px,8vw,64px)] leading-[0.95] tracking-tight">
                {siteCopy.github.headline}{" "}
                <span className="text-[#1A6B35]">{siteCopy.github.headlineAccent}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#1A6B35]">
              <span className="hero-nav-pulse w-2 h-2 rounded-full bg-[#1A6B35]" />
              {siteCopy.github.liveLabel}
            </div>
          </div>
        </div>

        <GitHubFeed />
      </section>

      {/* About & Contact */}
      <section id="about" className="bg-[#F5F5F0] text-[#0D0D0D]">
        <div className="border-b border-black/[0.08] px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <p className="chat-section-label">{siteCopy.about.sectionLabel}</p>
            <h2 className="mt-2 font-display text-[clamp(40px,8vw,64px)] leading-[0.95] tracking-tight">
              {siteCopy.about.headline}{" "}
              <span className="text-[#1A6B35]">{siteCopy.about.headlineAccent}</span>
            </h2>
          </div>
        </div>

        <div className="border-b border-black/[0.08] p-10">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2">
            <p className="font-mono text-sm leading-[1.9] text-black/55">
              <RichText parts={about.bioStrip} />
            </p>
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
                      className="px-3 py-1.5 text-xs border border-black/[0.12] text-black/45"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-b border-black/[0.08] p-10">
          <div className="max-w-6xl mx-auto">
            <p className="chat-section-label mb-8">{siteCopy.experience.label}</p>
            <div className="space-y-12">
              {experience.map((job) => (
                <div
                  key={`${job.company}-${job.period}`}
                  className="grid gap-x-10"
                  style={{ gridTemplateColumns: "160px 1px 1fr" }}
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
        </div>

        <div className="border-b border-black/[0.08] p-10">
          <div className="max-w-6xl mx-auto">
            <p className="chat-section-label mb-8">{siteCopy.leadership.label}</p>
            <div className="grid gap-4 md:grid-cols-3">
              {leadership.map((entry) => (
                <article
                  key={`${entry.title}-${entry.period}`}
                  className="border-[0.5px] border-black/[0.08] p-5 transition-colors hover:border-[#1A6B35]/30"
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

      <section id="contact" className="bg-[#F5F5F0] text-[#0D0D0D] border-t border-black/[0.08]">
        <div className="p-10">
          <div className="max-w-6xl mx-auto">
            <p className="chat-section-label">{siteCopy.contact.label}</p>
            <a
              href={`mailto:${about.email}`}
              className="mt-4 inline-block font-display text-[clamp(32px,6vw,42px)] leading-none text-[#1A6B35] hover:opacity-80 transition-opacity"
            >
              {about.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-6">
              {siteCopy.contact.links.map((link) => (
                <a
                  key={link.key}
                  href={about[link.key]}
                  target={link.key === "github" ? "_blank" : undefined}
                  rel={link.key === "github" ? "noreferrer" : undefined}
                  className="font-mono text-[11px] text-black/45 hover:text-[#1A6B35] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-black/[0.08] px-10 py-6">
          <p className="text-[10px] text-black/35">
            {siteCopy.footer.copyright(about.name, about.year)}
          </p>
          <p className="text-[10px] text-black/35">{siteCopy.footer.builtWith}</p>
        </footer>
      </section>
    </div>
  );
}
