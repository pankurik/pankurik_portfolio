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
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 py-5 border-b border-border">
        <div className="w-10 h-10 rounded-full bg-accent-dim flex items-center justify-center text-white font-bold text-lg">
          P
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Pankuri Khare
          </h1>
          <p className="text-xs text-zinc-500 font-mono">AI portfolio agent</p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Ask me anything
              </h2>
              <p className="text-zinc-500 max-w-md">
                I&apos;m Pankuri&apos;s AI agent. Ask about my experience,
                projects, skills, or anything else.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-4 py-2.5 text-sm rounded-xl border border-border text-zinc-400 hover:text-white hover:border-accent-dim hover:bg-surface-hover transition-all duration-200 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-accent-dim text-white rounded-br-md"
                      : "bg-surface text-zinc-300 border border-border rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  <span className="typing-dot w-2 h-2 rounded-full bg-accent" />
                  <span className="typing-dot w-2 h-2 rounded-full bg-accent" />
                  <span className="typing-dot w-2 h-2 rounded-full bg-accent" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input */}
      <footer className="px-6 pb-6 pt-2">
        <div className="flex items-end gap-3 bg-surface border border-border rounded-2xl px-4 py-3 glow focus-within:border-accent-dim transition-colors">
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
            className="p-2 rounded-xl bg-accent-dim text-white hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
        <p className="text-center text-xs text-zinc-700 mt-3 font-mono">
          powered by claude haiku 3.5 + rag
        </p>
      </footer>
    </div>
  );
}
