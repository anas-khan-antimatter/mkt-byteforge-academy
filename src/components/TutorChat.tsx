"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "tutor";
  content: string;
};

const WELCOME_MSG: Message = {
  role: "tutor",
  content: `**Byteforge AI Tutor ready.**\n\nPaste a code snippet and ask me to explain it, debug it, or suggest improvements.\n\nExamples:\n- "Explain this function"\n- "Debug this error"\n- "How can I improve this?"`,
};

export default function TutorChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [snippet, setSnippet] = useState("");
  const [showSnippetInput, setShowSnippetInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const snippetRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          snippet: snippet || "// No specific snippet provided",
          question: input,
        }),
      });

      const data = await res.json();

      const tutorMsg: Message = {
        role: "tutor",
        content: data.explanation || "Sorry, I couldn't process that. Try rephrasing.",
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "tutor",
          content:
            "**Connection error.** I couldn't reach the tutor service. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-purple-900/30 bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-purple-900/20 bg-surface/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-gray-300">Byteforge AI Tutor</span>
          <span className="text-[10px] font-mono text-gray-600">v2.0</span>
        </div>
        <button
          onClick={() => setShowSnippetInput(!showSnippetInput)}
          className={`text-[10px] font-mono px-2.5 py-1 rounded transition-colors ${
            showSnippetInput
              ? "bg-purple-500/20 text-purple-300 border border-purple-600/30"
              : "text-gray-400 border border-purple-800/30 hover:border-purple-600/50"
          }`}
        >
          {showSnippetInput ? "hide snippet" : "+ snippet"}
        </button>
      </div>

      {/* Snippet input */}
      {showSnippetInput && (
        <div className="border-b border-purple-900/20 p-3 bg-surface/30">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
              Code snippet
            </span>
            <span className="text-[10px] font-mono text-gray-600">
              {snippet.length} chars
            </span>
          </div>
          <textarea
            ref={snippetRef}
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
            placeholder="Paste your code here for context..."
            className="w-full h-24 p-3 bg-black/50 border border-purple-800/30 rounded-lg text-xs font-mono text-gray-200 placeholder:text-gray-600 outline-none focus:border-purple-500/50 resize-none transition-colors"
            spellCheck={false}
          />
        </div>
      )}

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2.5 text-xs font-mono leading-relaxed ${
                msg.role === "user"
                  ? "bg-purple-500/15 border border-purple-700/30 text-gray-200"
                  : "bg-surface-light border border-purple-900/20 text-gray-300"
              }`}
            >
              {msg.role === "tutor" && (
                <div className="text-[10px] text-purple-400 mb-1 font-bold uppercase tracking-wider">
                  Tutor
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-surface-light border border-purple-900/20 rounded-lg px-4 py-2.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-purple-900/20 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Ask about your code..."
            className="flex-1 px-4 py-2.5 bg-black/50 border border-purple-800/30 rounded-lg text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 transition-colors"
            disabled={loading}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-mono font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <span>$</span>
            ask
          </button>
        </div>
      </div>
    </div>
  );
}