"use client";

import { useState, useRef, useEffect } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsGrid } from "@/components/SkillsGrid";
import { GitHubFeed } from "@/components/GitHubFeed";
import {
  about,
  projects,
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const isEmpty = messages.length === 0;

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
      <section id="chat" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
              {siteCopy.chat.title}
            </h2>
            <p className="text-zinc-500 mt-2 max-w-2xl">
              {siteCopy.chat.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-rows-[1fr_auto] h-[70vh] min-h-[520px] border border-border rounded-2xl bg-surface overflow-hidden">
          {/* Messages */}
          <div className="overflow-y-auto px-5 py-6">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                <p className="text-zinc-500 max-w-md">
                  Start with a question or pick a prompt.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {siteCopy.chat.suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-4 py-2.5 text-sm rounded-xl border border-border text-zinc-400 hover:text-white hover:border-accent hover:bg-surface-hover transition-all duration-200 cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-accent text-black rounded-br-md"
                          : "bg-background/40 text-zinc-200 border border-border rounded-bl-md"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-background/40 border border-border rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                      <span className="typing-dot w-2 h-2 rounded-full bg-accent" />
                      <span className="typing-dot w-2 h-2 rounded-full bg-accent" />
                      <span className="typing-dot w-2 h-2 rounded-full bg-accent" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border bg-surface px-5 py-4">
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={siteCopy.chat.placeholder}
                rows={1}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 resize-none outline-none max-h-32"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-accent text-black hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Send message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.11 28.11 0 0 0 15.95-7.256.75.75 0 0 0 0-1.012A28.11 28.11 0 0 0 3.105 2.288Z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-zinc-700 mt-3">
              {siteCopy.chat.poweredBy}
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h2 className="font-display text-white leading-[0.9] tracking-tight" style={{ fontSize: "clamp(44px, 6vw, 72px)" }}>
          {siteCopy.projects.title}
        </h2>
        <p className="mt-4 text-zinc-500 max-w-2xl">
          {siteCopy.projects.subtitle}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-border">
        <h2
          className="font-display text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(44px, 6vw, 72px)" }}
        >
          {siteCopy.skills.title}
        </h2>

        <div className="mt-10">
          <SkillsGrid />
        </div>
      </section>

      {/* GitHub */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-border">
        <h2
          className="font-display text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(44px, 6vw, 72px)" }}
        >
          {siteCopy.github.title}
        </h2>
        <p className="mt-4 text-zinc-500 max-w-2xl">
          {siteCopy.github.subtitle}
        </p>

        <div className="mt-10">
          <GitHubFeed />
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-border">
        <h2
          className="font-display text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(44px, 6vw, 72px)" }}
        >
          {siteCopy.about.title}
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr] items-start">
          <div className="hidden md:block relative">
            <div className="select-none font-display text-white/5 leading-none tracking-tight text-[160px]">
              {about.initials}
            </div>
          </div>

          <div className="space-y-10">
            <div className="text-zinc-400 leading-relaxed">
              <p>{about.bio}</p>

              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {siteCopy.about.badges.map((badge) => (
                  <span key={badge} className="text-accent font-semibold">
                    {badge}
                  </span>
                ))}
                <span className="text-accent font-semibold">{about.availability}</span>
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold tracking-tight">
                {siteCopy.experience.title}
              </h3>
              <div className="mt-6 space-y-8">
                {experience.map((job) => (
                  <div key={`${job.company}-${job.period}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-white font-semibold">{job.role}</p>
                      <p className="text-xs text-zinc-500">{job.period}</p>
                    </div>
                    <p className="text-sm text-accent mt-1">
                      {job.company} · {job.location}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-400 list-disc pl-5">
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold tracking-tight">
                {siteCopy.leadership.title}
              </h3>
              <div className="mt-6 space-y-6">
                {leadership.map((entry) => (
                  <div key={`${entry.title}-${entry.organization}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-white font-semibold">{entry.title}</p>
                      <p className="text-xs text-zinc-500">{entry.period}</p>
                    </div>
                    <p className="text-sm text-accent mt-1">{entry.organization}</p>
                    <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-border">
        <h2
          className="font-display text-white leading-[0.9] tracking-tight text-center"
          style={{ fontSize: "clamp(44px, 6vw, 72px)" }}
        >
          {siteCopy.contact.title}
        </h2>

        <p className="mt-6 text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed">
          {siteCopy.contact.subtitle}
        </p>

        <div className="mt-10 flex items-center justify-center">
          <a
            href={`mailto:${about.email}`}
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-accent text-black font-semibold tracking-tight hover:opacity-90 transition-opacity glow"
          >
            {siteCopy.contact.cta}
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <a
            href={about.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-accent">●</span> GitHub
          </a>
          <a
            href={about.linkedin}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-accent">●</span> LinkedIn
          </a>
          <a
            href={about.resume}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-accent">●</span> Resume
          </a>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-zinc-600">
              {siteCopy.footer.builtBy(about.name)}
            </p>

            <details className="text-xs text-zinc-500">
              <summary className="cursor-pointer select-none hover:text-white transition-colors">
                [ built with ]
              </summary>
              <div className="mt-3 rounded-xl border border-border bg-surface px-4 py-3 text-zinc-400">
                {siteCopy.footer.stack}
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
