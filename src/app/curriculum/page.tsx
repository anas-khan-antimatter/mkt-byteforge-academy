"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

const modules = [
  {
    id: 1,
    title: "Terminal & Tooling",
    desc: "Linux, Git, Vim, VS Code, shell scripting. The foundation every engineer needs.",
    duration: "Week 1-2",
    unlocked: true,
    topics: ["Bash/Zsh", "Git & PR workflow", "SSH & keys", "Dotfiles & aliases"],
  },
  {
    id: 2,
    title: "JavaScript Deep Dive",
    desc: "Closures, prototypes, async, event loop. No frameworks until you know the language.",
    duration: "Week 3-5",
    unlocked: true,
    topics: ["ES6+ syntax", "Promises & async/await", "this & binding", "Modules & bundlers"],
  },
  {
    id: 3,
    title: "TypeScript Systems",
    desc: "Types, generics, infer, utility types. Write code that documents itself.",
    duration: "Week 6-7",
    unlocked: true,
    topics: ["Type annotations", "Generics & constraints", "Type inference", "Declaration files"],
  },
  {
    id: 4,
    title: "React & Next.js",
    desc: "Components, hooks, SSR, app router. Ship real UIs with modern React.",
    duration: "Week 8-10",
    unlocked: false,
    prerequisite: "Complete modules 1-3",
    topics: ["Functional components", "useState / useEffect", "Server components", "Routing & layouts"],
  },
  {
    id: 5,
    title: "Node.js & APIs",
    desc: "Express, middleware, auth, WebSocket, REST + GraphQL. Build the backend.",
    duration: "Week 11-13",
    unlocked: false,
    prerequisite: "Complete module 4",
    topics: ["RESTful design", "JWT & OAuth", "WebSocket", "Testing with Jest"],
  },
  {
    id: 6,
    title: "Deploy & Scale",
    desc: "Docker, CI/CD, cloud deployment, monitoring. Ship to production.",
    duration: "Week 14-16",
    unlocked: false,
    prerequisite: "Complete module 5",
    topics: ["Docker containers", "GitHub Actions", "Vercel / AWS", " observability"],
  },
];

export default function CurriculumPage() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState<number[]>([1, 2, 3]);
  const [showUnlockPrompt, setShowUnlockPrompt] = useState<number | null>(null);
  const [unlockError, setUnlockError] = useState("");

  const handleUnlockAttempt = (moduleId: number) => {
    // Easter egg: type "deploy" to unlock
    if (password.toLowerCase() === "deploy") {
      setUnlocked((prev) => [...prev, moduleId]);
      setShowUnlockPrompt(null);
      setPassword("");
      setUnlockError("");
    } else {
      setUnlockError("Access denied. Hint: what you do to production.");
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-surface pt-24 pb-20">
        {/* Hero */}
        <section className="relative border-b border-purple-900/20 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/3 blur-[100px]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="inline-block px-3 py-1 rounded bg-purple-950/50 border border-purple-800/40 text-purple-300 text-[10px] font-mono uppercase tracking-wider mb-4">
              CURRICULUM
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Full-Stack <span className="text-gradient">Engineering</span> Track
            </h1>
            <p className="text-sm text-gray-400 font-mono max-w-2xl">
              A 16-week terminal-to-production curriculum. Modules unlock as you progress.
              Each module ships a real deliverable to your portfolio.
            </p>
          </div>
        </section>

        {/* Module tree */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Timeline line */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500/20" />

            <div className="space-y-6">
              {modules.map((mod, i) => {
                const isUnlocked = unlocked.includes(mod.id);
                const isSelected = selectedModule === mod.id;

                return (
                  <div key={mod.id} className="relative pl-16">
                    {/* Node dot */}
                    <div
                      className={`absolute left-4 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isUnlocked
                          ? "border-purple-500 bg-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                          : "border-gray-700 bg-surface"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isUnlocked ? "bg-purple-400" : "bg-gray-600"
                        }`}
                      />
                    </div>

                    {/* Card */}
                    <div
                      className={`rounded-xl border transition-all duration-300 cursor-pointer ${
                        isUnlocked
                          ? isSelected
                            ? "border-purple-500/50 bg-purple-950/20 shadow-lg shadow-purple-500/5"
                            : "border-purple-900/30 bg-surface hover:border-purple-700/40 hover:bg-surface-light"
                          : "border-gray-800 bg-surface/50 opacity-60"
                      }`}
                      onClick={() => isUnlocked && setSelectedModule(isSelected ? null : mod.id)}
                    >
                      {/* Card header */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-1 rounded ${
                                isUnlocked
                                  ? "bg-purple-500/10 text-purple-300 border border-purple-800/30"
                                  : "bg-gray-800 text-gray-600 border border-gray-700"
                              }`}
                            >
                              MOD {String(mod.id).padStart(2, "0")}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500">
                              {mod.duration}
                            </span>
                          </div>

                          {!isUnlocked && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowUnlockPrompt(mod.id);
                              }}
                              className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 border border-cyan-800/30 hover:border-cyan-600/50 rounded px-2.5 py-1 transition-colors"
                            >
                              unlock
                            </button>
                          )}
                        </div>

                        <h3
                          className={`text-base font-bold mb-1 ${
                            isUnlocked ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {mod.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono leading-relaxed">
                          {mod.desc}
                        </p>

                        {!isUnlocked && mod.prerequisite && (
                          <div className="mt-2 flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-yellow-600">🔒</span>
                            <span className="text-[10px] font-mono text-yellow-600/70">
                              {mod.prerequisite}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Expanded topics */}
                      {isSelected && isUnlocked && (
                        <div className="px-5 pb-5 border-t border-purple-900/20 pt-4">
                          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">
                            Topics
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {mod.topics.map((topic) => (
                              <span
                                key={topic}
                                className="text-[11px] font-mono px-2.5 py-1 rounded bg-purple-950/30 border border-purple-800/20 text-gray-300"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Unlock dialog */}
                    {showUnlockPrompt === mod.id && (
                      <div className="mt-2 ml-0 p-4 rounded-lg bg-surface-light border border-purple-900/30">
                        <div className="font-mono text-[10px] text-gray-500 mb-2">
                          Enter passcode to unlock module:
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleUnlockAttempt(mod.id);
                              if (e.key === "Escape") {
                                setShowUnlockPrompt(null);
                                setPassword("");
                                setUnlockError("");
                              }
                            }}
                            placeholder="> enter passcode"
                            className="flex-1 px-3 py-2 bg-black/50 border border-purple-800/30 rounded text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50"
                            autoFocus
                          />
                          <button
                            onClick={() => handleUnlockAttempt(mod.id)}
                            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-xs font-mono text-white font-semibold transition-colors"
                          >
                            $ enter
                          </button>
                        </div>
                        {unlockError && (
                          <div className="mt-2 text-[10px] font-mono text-red-400">
                            ✗ {unlockError}
                          </div>
                        )}
                        <div className="mt-1 text-[10px] font-mono text-gray-600 italic">
                          (Press Esc to cancel)
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-12 p-5 rounded-xl bg-surface-light border border-purple-900/20">
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-3">
              LEGEND & NOTES
            </div>
            <div className="space-y-2 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.3)]" />
                <span>Unlocked — dive in</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-gray-600" />
                <span>Locked — complete prerequisites</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 pt-1 border-t border-gray-800">
                <span className="font-mono">🔒</span>
                <span>
                  Locked modules show an unlock prompt. Hint: type <span className="text-cyan-400">deploy</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}