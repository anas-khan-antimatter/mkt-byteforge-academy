"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

const allModules = [
  {
    id: 1,
    title: "Terminal & Tooling",
    desc: "Linux, Git, Vim, VS Code, shell scripting. The foundation every engineer needs.",
    duration: "Week 1-2",
    unlocked: true,
    topics: ["Bash/Zsh", "Git & PR workflow", "SSH & keys", "Dotfiles & aliases", "Package managers"],
    deliverables: "Ship your dotfiles repo with custom aliases",
  },
  {
    id: 2,
    title: "JavaScript Deep Dive",
    desc: "Closures, prototypes, async, event loop. No frameworks until you know the language.",
    duration: "Week 3-5",
    unlocked: true,
    topics: ["ES6+ syntax", "Promises & async/await", "this & binding", "Modules & bundlers", "Error handling"],
    deliverables: "Build a CLI tool that processes files asynchronously",
  },
  {
    id: 3,
    title: "TypeScript Systems",
    desc: "Types, generics, infer, utility types. Write code that documents itself.",
    duration: "Week 6-7",
    unlocked: true,
    topics: ["Type annotations", "Generics & constraints", "Type inference", "Declaration files", "Utility types"],
    deliverables: "Port your CLI tool to TypeScript with full type safety",
  },
  {
    id: 4,
    title: "React & Next.js",
    desc: "Components, hooks, SSR, app router. Ship real UIs with modern React.",
    duration: "Week 8-10",
    unlocked: false,
    prerequisite: "Complete modules 1-3",
    topics: ["Functional components", "useState / useEffect", "Server components", "Routing & layouts", "Data fetching"],
    deliverables: "Build and deploy a full-stack Next.js application",
  },
  {
    id: 5,
    title: "Node.js & APIs",
    desc: "Express, middleware, auth, WebSocket, REST + GraphQL. Build the backend.",
    duration: "Week 11-13",
    unlocked: false,
    prerequisite: "Complete module 4",
    topics: ["RESTful design", "JWT & OAuth", "WebSocket", "Testing with Jest", "Rate limiting"],
    deliverables: "Deploy a production API with auth and tests",
  },
  {
    id: 6,
    title: "Databases & Storage",
    desc: "SQL, NoSQL, ORMs, migrations, caching. Store data the right way.",
    duration: "Week 11-13 (parallel)",
    unlocked: false,
    prerequisite: "Complete module 4",
    topics: ["PostgreSQL", "Prisma ORM", "Redis caching", "Database migrations", "Query optimization"],
    deliverables: "Integrate a database with your API project",
  },
  {
    id: 7,
    title: "Deploy & Scale",
    desc: "Docker, CI/CD, cloud deployment, monitoring. Ship to production.",
    duration: "Week 14-16",
    unlocked: false,
    prerequisite: "Complete modules 5-6",
    topics: ["Docker containers", "GitHub Actions", "Vercel / AWS", "Observability", "Load testing"],
    deliverables: "CI/CD pipeline that auto-deploys your full-stack app",
  },
  {
    id: 8,
    title: "Capstone Project",
    desc: "Design, build, and ship a production-grade application from scratch. Portfolio centerpiece.",
    duration: "Week 14-16 (parallel)",
    unlocked: false,
    prerequisite: "Complete modules 5-6",
    topics: ["Architecture design", "Project management", "Code review", "Production deployment", "Documentation"],
    deliverables: "A fully deployed production application with docs",
  },
];

const tracks = [
  { id: "fullstack", label: "Full-Stack Engineering", modules: 8, color: "from-purple-500 to-cyan-400" },
  { id: "datascience", label: "Data Science & AI", modules: 10, color: "from-cyan-500 to-emerald-400" },
  { id: "infra", label: "Systems & Infrastructure", modules: 9, color: "from-emerald-500 to-teal-400" },
];

export default function CurriculumPage() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState<number[]>([1, 2, 3]);
  const [showUnlockPrompt, setShowUnlockPrompt] = useState<number | null>(null);
  const [unlockError, setUnlockError] = useState("");
  const [activeTrack, setActiveTrack] = useState("fullstack");

  const modules = allModules;

  const handleUnlockAttempt = (moduleId: number) => {
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
              CURRICULUM v3.0
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Full-Stack <span className="text-gradient">Engineering</span> Track
            </h1>
            <p className="text-sm text-gray-400 font-mono max-w-2xl mb-8">
              A 16-week terminal-to-production curriculum. Modules unlock as you progress.
              Each module ships a real deliverable to your portfolio.
            </p>

            {/* Track selector */}
            <div className="flex flex-wrap gap-3">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-mono transition-all ${
                    activeTrack === track.id
                      ? `bg-gradient-to-r ${track.color} text-black font-bold shadow-lg`
                      : "bg-surface border border-purple-800/30 text-gray-400 hover:border-purple-600/50"
                  }`}
                >
                  {track.label}
                  <span className="ml-2 opacity-60">{track.modules} modules</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Total Modules", value: "8", icon: "📦" },
              { label: "Weeks", value: "16", icon: "⏱" },
              { label: "Projects Shipped", value: "8+", icon: "🚀" },
              { label: "Unlocked", value: `${unlocked.length}/${modules.length}`, icon: "🔓" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-surface border border-purple-900/20">
                <div className="text-lg font-black text-white font-mono">{stat.value}</div>
                <div className="text-[10px] font-mono text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Module tree */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Timeline line */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500/20" />

            <div className="space-y-6">
              {modules.map((mod) => {
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

                        <h3 className={`text-base font-bold mb-1 ${isUnlocked ? "text-white" : "text-gray-500"}`}>
                          {mod.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono leading-relaxed">
                          {mod.desc}
                        </p>

                        {!isUnlocked && mod.prerequisite && (
                          <div className="mt-2 flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-yellow-600">🔒</span>
                            <span className="text-[10px] font-mono text-yellow-600/70">{mod.prerequisite}</span>
                          </div>
                        )}
                      </div>

                      {/* Expanded content */}
                      {isSelected && isUnlocked && (
                        <div className="px-5 pb-5 border-t border-purple-900/20 pt-4 space-y-4">
                          <div>
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
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
                          <div>
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
                              Deliverable
                            </div>
                            <div className="text-[11px] font-mono text-cyan-300/80 bg-cyan-950/20 border border-cyan-800/20 rounded-lg px-3 py-2">
                              🚀 {mod.deliverables}
                            </div>
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
                          <div className="mt-2 text-[10px] font-mono text-red-400">✗ {unlockError}</div>
                        )}
                        <div className="mt-1 text-[10px] font-mono text-gray-600 italic">(Press Esc to cancel)</div>
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
                <span>Unlocked — click to expand topics and deliverable</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-gray-700" />
                <span>Locked — enter passcode "deploy" to unlock ahead</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-yellow-500">🔒</span>
                <span>Prerequisites shown — complete prior modules first</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}