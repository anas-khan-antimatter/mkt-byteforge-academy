"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

const projects = [
  {
    id: 1,
    title: "PixelForge — Real-time Collab Editor",
    student: "Aisha M.",
    cohort: "Summer 2025",
    description:
      "A Google Docs-inspired real-time collaborative markdown editor with WebSocket sync, cursor presence, and version history. Built with React, Y.js, and Node.js.",
    tags: ["React", "WebSocket", "Y.js", "Node.js"],
    image: null,
    stars: 47,
    url: "https://github.com",
  },
  {
    id: 2,
    title: "StockScope — ML Market Predictor",
    student: "Jay K.",
    cohort: "Summer 2025",
    description:
      "LSTM-based stock trend predictor with a React dashboard. Scrapes live data, runs inference via Flask API, visualizes with Chart.js.",
    tags: ["Python", "TensorFlow", "Flask", "Chart.js"],
    image: null,
    stars: 38,
    url: "https://github.com",
  },
  {
    id: 3,
    title: "DevPath — AI Career Navigator",
    student: "Priya R.",
    cohort: "Spring 2025",
    description:
      "An AI-powered career path recommendation engine. Upload your resume, get matched with roles, skill gaps, and a custom learning plan.",
    tags: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind"],
    image: null,
    stars: 52,
    url: "https://github.com",
  },
  {
    id: 4,
    title: "CloudDeck — Infrastructure Dashboard",
    student: "Marcus T.",
    cohort: "Spring 2025",
    description:
      "Real-time cloud infrastructure monitoring dashboard. Tracks EC2, RDS, Lambda. Live metrics via AWS SDK + Chart.js.",
    tags: ["TypeScript", "AWS SDK", "React", "D3.js"],
    image: null,
    stars: 29,
    url: "https://github.com",
  },
  {
    id: 5,
    title: "FitSync — Workout Tracker",
    student: "Elena V.",
    cohort: "Winter 2025",
    description:
      "Full-stack workout tracking app with progress charts, social features, and a progressive web app (PWA) offline mode.",
    tags: ["Next.js", "Prisma", "SQLite", "PWA"],
    image: null,
    stars: 33,
    url: "https://github.com",
  },
  {
    id: 6,
    title: "CodeLint — PR Review Bot",
    student: "Danny W.",
    cohort: "Winter 2025",
    description:
      "A GitHub App that automatically lints PRs, enforces code style, and posts review comments. Supports ESLint, Prettier, and custom rules.",
    tags: ["Node.js", "GitHub API", "Docker", "ESLint"],
    image: null,
    stars: 44,
    url: "https://github.com",
  },
  {
    id: 7,
    title: "ChatBridge — Multi-Platform Messenger",
    student: "Lina N.",
    cohort: "Fall 2024",
    description:
      "Unified messaging interface for Slack, Discord, and Telegram. One dashboard to manage cross-platform conversations.",
    tags: ["React", "WebSocket", "OAuth", "Redis"],
    image: null,
    stars: 31,
    url: "https://github.com",
  },
  {
    id: 8,
    title: "TerraForma — Cloud Cost Optimizer",
    student: "Omar S.",
    cohort: "Fall 2024",
    description:
      "Terraform-based infrastructure cost analyzer. Scans existing .tf configs, estimates monthly costs, and suggests savings.",
    tags: ["Terraform", "Go", "React", "GraphQL"],
    image: null,
    stars: 27,
    url: "https://github.com",
  },
];

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-surface pt-24 pb-20">
        {/* Hero */}
        <section className="relative border-b border-purple-900/20 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/3 blur-[100px]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="inline-block px-3 py-1 rounded bg-purple-950/50 border border-purple-800/40 text-purple-300 text-[10px] font-mono uppercase tracking-wider mb-4">
              STUDENT SHOWCASE
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Built at <span className="text-gradient">Byteforge</span>
            </h1>
            <p className="text-sm text-gray-400 font-mono max-w-2xl">
              Production apps shipped by our students. Every graduate leaves with a portfolio
              of real, deployed projects.
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-[11px] font-mono px-3 py-1.5 rounded transition-colors ${
                !activeTag
                  ? "bg-purple-500/20 text-purple-300 border border-purple-600/30"
                  : "bg-surface text-gray-500 border border-purple-900/20 hover:border-purple-700/40 hover:text-gray-300"
              }`}
            >
              # all
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-[11px] font-mono px-3 py-1.5 rounded transition-colors ${
                  activeTag === tag
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-600/30"
                    : "bg-surface text-gray-500 border border-purple-900/20 hover:border-cyan-700/40 hover:text-gray-300"
                }`}
              >
                # {tag}
              </button>
            ))}
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-surface border border-purple-900/20 text-center">
              <div className="text-2xl font-black text-white font-mono">{projects.length}</div>
              <div className="text-[10px] font-mono text-gray-500 mt-1">Projects shipped</div>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-purple-900/20 text-center">
              <div className="text-2xl font-black text-white font-mono">
                {projects.reduce((s, p) => s + p.stars, 0)}
              </div>
              <div className="text-[10px] font-mono text-gray-500 mt-1">GitHub stars</div>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-purple-900/20 text-center">
              <div className="text-2xl font-black text-white font-mono">
                {allTags.length}
              </div>
              <div className="text-[10px] font-mono text-gray-500 mt-1">Tech tags</div>
            </div>
          </div>

          {/* Project grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl bg-surface border border-purple-900/30 hover:border-purple-500/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-purple-500/5"
              >
                {/* Code illustration area */}
                <div className="h-28 bg-gradient-to-br from-purple-950/40 to-cyan-950/30 flex items-center justify-center border-b border-purple-900/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative z-10 text-3xl font-mono font-bold text-purple-400/30 group-hover:text-purple-300/50 transition-colors">
                    {'</>'}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400">
                        {project.student}
                      </span>
                      <span className="text-[10px] font-mono text-gray-600 ml-2">
                        {project.cohort}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-yellow-500">
                      <span>★</span>
                      <span>{project.stars}</span>
                    </div>
                  </div>

                  <h3
                    className="text-sm font-bold text-white mb-1.5 group-hover:text-purple-200 transition-colors cursor-pointer"
                    onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                  >
                    {project.title}
                  </h3>

                  {expanded === project.id && (
                    <p className="text-[11px] text-gray-400 font-mono leading-relaxed mb-2 animate-fade-in">
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950/30 border border-purple-800/20 text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="font-mono text-4xl text-gray-700 mb-4">∅</div>
              <p className="text-sm font-mono text-gray-500">
                No projects match <span className="text-cyan-400">#{activeTag}</span>
              </p>
              <button
                onClick={() => setActiveTag(null)}
                className="mt-4 text-xs font-mono text-purple-400 hover:text-purple-300 underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}