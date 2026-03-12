"use client";

import { useState, useRef, useEffect } from "react";

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
        <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
          Projects
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {
              title: "AdsGency AI",
              desc: "AI-driven marketing automation platform for e-commerce.",
              meta: "Python • FastAPI • AWS • Postgres • Shopify",
            },
            {
              title: "Recipe iOS App",
              desc: "SwiftUI cooking-mode app with timers + text-to-speech.",
              meta: "Swift • SwiftUI • AVFoundation",
            },
            {
              title: "Personal Finance Discord Bot",
              desc: "Chat-first expense tracking + budgets in Discord.",
              meta: "Python • MySQL • Discord API",
            },
          ].map((p) => (
            <div key={p.title} className="border border-border rounded-2xl bg-surface p-5 hover:bg-surface-hover transition-colors">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-white font-semibold tracking-tight">{p.title}</h3>
                <div className="w-2 h-2 rounded-full bg-accent glow mt-2" />
              </div>
              <p className="text-zinc-400 mt-3 text-sm leading-relaxed">{p.desc}</p>
              <p className="text-zinc-600 mt-4 text-xs">{p.meta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-border">
        <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
          Skills
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm">
          {[
            { k: "Languages", v: "Python, TypeScript, SQL, Swift" },
            { k: "Backend", v: "FastAPI, Node.js, REST APIs" },
            { k: "Frontend", v: "React, Next.js" },
            { k: "Databases", v: "PostgreSQL, MySQL" },
            { k: "DevOps", v: "AWS, CI/CD, Docker" },
            { k: "Interests", v: "AI systems, infra, developer tools" },
          ].map((s) => (
            <div key={s.k} className="border border-border rounded-2xl bg-surface p-5">
              <p className="text-zinc-500 text-xs uppercase tracking-[0.18em]">{s.k}</p>
              <p className="text-white mt-3 leading-relaxed">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-border">
        <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
          About
        </h2>
        <div className="mt-8 max-w-3xl text-zinc-400 leading-relaxed space-y-4">
          <p>
            I’m a full-stack engineer in San Francisco with 1–2 years of experience.
            I studied Computer Science and Comparative World Literature at SFSU—part
            logic, part story. I like owning features end-to-end and sweating the
            integration details until they behave.
          </p>
          <p>
            I’m currently looking for a full-time role at an early-stage or growth-stage
            startup working on AI systems, infrastructure, or interesting backend problems.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16 md:py-20 border-t border-border">
        <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
          Contact
        </h2>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:pankuri.kh@gmail.com"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-accent text-black font-semibold tracking-tight hover:opacity-90 transition-opacity glow"
          >
            Email me
          </a>
          <a
            href="https://github.com/pankurik"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border text-white hover:border-accent hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>

        <p className="text-xs text-zinc-700 mt-10">
          © {new Date().getFullYear()} Pankuri Khare
        </p>
      </section>
    </div>
  );
}
