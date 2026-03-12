"use client";

import { useState, useRef, useEffect } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsGrid } from "@/components/SkillsGrid";
import { GitHubFeed } from "@/components/GitHubFeed";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What tech stack do you work with?",
  "Tell me about your recent projects",
  "What's your background?",
];

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
      {/* Sticky navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollToId("top")}
            className="text-white tracking-tight font-semibold hover:text-accent transition-colors cursor-pointer"
          >
            Pankuri Khare
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <button onClick={() => scrollToId("projects")} className="hover:text-white transition-colors cursor-pointer">
              Projects
            </button>
            <button onClick={() => scrollToId("skills")} className="hover:text-white transition-colors cursor-pointer">
              Skills
            </button>
            <a
              href="https://github.com/pankurik"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <button onClick={() => scrollToId("about")} className="hover:text-white transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => scrollToId("contact")} className="hover:text-white transition-colors cursor-pointer">
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden hero-backdrop">
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Full-stack engineer • San Francisco
            </p>
            <h1
              className="font-display text-white leading-[0.9] tracking-tight mt-4"
              style={{ fontSize: "clamp(60px, 10vw, 120px)" }}
            >
              I build things that don&apos;t break.
            </h1>
            <p className="mt-6 text-zinc-400 max-w-xl text-base md:text-lg leading-relaxed">
              Full-stack engineer. SF-based. Currently looking for the right team.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollToId("chat")}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-accent text-black font-semibold tracking-tight hover:opacity-90 transition-opacity cursor-pointer glow"
              >
                Chat with my AI
              </button>
              <button
                onClick={() => scrollToId("projects")}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border text-white hover:border-accent hover:text-accent transition-colors cursor-pointer"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Chat */}
      <section id="chat" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
              Ask me anything
            </h2>
            <p className="text-zinc-500 mt-2 max-w-2xl">
              Ask about my experience, projects, skills, or what I’m looking for.
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
                  {SUGGESTED_QUESTIONS.map((q) => (
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
                placeholder="Ask me something..."
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
              powered by claude haiku + rag
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h2 className="font-display text-white leading-[0.9] tracking-tight" style={{ fontSize: "clamp(44px, 6vw, 72px)" }}>
          Things I&apos;ve Built
        </h2>
        <p className="mt-4 text-zinc-500 max-w-2xl">
          Real systems, shipped work, and projects I built because I wanted them to exist.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <ProjectCard
            name="AdsGency AI"
            type="Professional"
            description="AI-driven marketing automation platform for e-commerce brands. I built backend services powering advertising workflows, integrated the Shopify API, and kept deployments stable with AWS + CI/CD."
            tech={["Python", "FastAPI", "AWS", "PostgreSQL", "Shopify API"]}
            caseStudy={{
              problem:
                "E-commerce teams needed reliable automation for ad workflows, but real-world integrations (Shopify, ads platforms, and internal services) often failed in edge cases.",
              built:
                "Backend services and pipelines to orchestrate AI ad workflows, robust Shopify API integrations, and the deployment tooling to ship safely and debug production quickly.",
              differently:
                "Invest earlier in integration test harnesses and better observability around third‑party API failures to reduce on-call debugging time.",
            }}
          />

          <ProjectCard
            name="Recipe iOS App"
            type="Personal"
            description="A SwiftUI cooking app designed for the actual cooking experience: big text, step-by-step navigation, and hands-free support. I built it because I genuinely wanted to use it."
            tech={["Swift", "SwiftUI", "AVFoundation"]}
            caseStudy={{
              problem:
                "Most recipe apps are great for browsing but clunky once you’re mid-cook—touching the screen with messy hands and losing your place.",
              built:
                "A focused cooking mode with step navigation, per-step timers, and text-to-speech so instructions can be followed without constantly looking at the phone.",
              differently:
                "Add more offline-first support and a better content pipeline (importing recipes cleanly) to make the app useful day one for more people.",
            }}
          />

          <ProjectCard
            name="Personal Finance Discord Bot"
            type="Personal"
            description="A Discord bot that makes tracking spending frictionless in chat. Log expenses by category, view summaries, and set budgets—without opening another app."
            tech={["Python", "MySQL", "Discord API"]}
            caseStudy={{
              problem:
                "Expense tracking fails when the workflow is too heavy—people won’t open a separate app every time they spend $6.",
              built:
                "A chat-first command system for logging expenses, generating summaries, and enforcing simple budgeting rules backed by a MySQL data model.",
              differently:
                "Improve UX with natural-language parsing and reminders, plus richer analytics dashboards outside Discord for long-term trends.",
            }}
          />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-border">
        <h2
          className="font-display text-white leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(44px, 6vw, 72px)" }}
        >
          What I Work With
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
          Recently Building
        </h2>
        <p className="mt-4 text-zinc-500 max-w-2xl">
          A quick snapshot of what I’ve been shipping lately.
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
          About Me
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr] items-start">
          <div className="hidden md:block relative">
            <div className="select-none font-display text-white/5 leading-none tracking-tight text-[160px]">
              PK
            </div>
          </div>

          <div className="text-zinc-400 leading-relaxed">
            <p>
              I studied Computer Science and Comparative World Literature at San
              Francisco State University — an unusual mix, but it shaped how I
              think: part logical, part creative. I like understanding whole
              systems, not just my piece of them. That curiosity shows up in how
              I debug, how I architect, and how I communicate. Outside of code
              I'm reading, exploring ideas across disciplines, and occasionally
              convincing myself a side project is a good idea. I'm most
              energized by early-stage teams building things that matter — where
              engineers are close to the problem and ownership is real.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <span className="text-accent font-semibold">1-2 yrs exp</span>
              <span className="text-accent font-semibold">SF Based</span>
              <span className="text-accent font-semibold">Open to work</span>
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
          Let&apos;s Work Together
        </h2>

        <p className="mt-6 text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed">
          I&apos;m actively looking for the right full-time role. If you&apos;re
          building something interesting, I&apos;d love to hear about it.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <a
            href="mailto:pankuri@email.com"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-accent text-black font-semibold tracking-tight hover:opacity-90 transition-opacity glow"
          >
            Get in Touch →
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <a
            href="https://github.com/pankurik"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-accent">●</span> GitHub
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-accent">●</span> LinkedIn
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="text-accent">●</span> Resume
          </a>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-zinc-600">
              Built by Pankuri Khare · Powered by Claude API + pgvector · 2026
            </p>

            <details className="text-xs text-zinc-500">
              <summary className="cursor-pointer select-none hover:text-white transition-colors">
                [ built with ]
              </summary>
              <div className="mt-3 rounded-xl border border-border bg-surface px-4 py-3 text-zinc-400">
                Next.js, Supabase, pgvector, OpenAI embeddings, Claude Haiku, Vercel
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
