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
    longDescription:
      "PixelForge supports concurrent editing for up to 50 users with real-time cursor presence, rich markdown rendering, and automatic conflict resolution via CRDTs. Features include slash-command menu, image uploads, export to PDF/MD, and a dark/light theme. Deployed on Vercel with a Node.js WebSocket server on Railway.",
    tags: ["React", "WebSocket", "Y.js", "Node.js"],
    image: null,
    stars: 47,
    forks: 12,
    url: "https://github.com",
    featured: true,
    testimonial: "Before Byteforge, I'd never touched WebSockets. Now I've shipped a real-time editor used by my classmates.",
  },
  {
    id: 2,
    title: "StockScope — ML Market Predictor",
    student: "Jay K.",
    cohort: "Summer 2025",
    description:
      "LSTM-based stock trend predictor with a React dashboard. Scrapes live data, runs inference via Flask API, visualizes with Chart.js.",
    longDescription:
      "StockScope uses a multi-variate LSTM trained on 10 years of S&P 500 data. Features a React dashboard with live stock tickers, portfolio backtesting, and sentiment analysis from financial news. Deployed with Docker on an AWS EC2 instance with a PostgreSQL database for historical predictions.",
    tags: ["Python", "TensorFlow", "Flask", "Chart.js"],
    image: null,
    stars: 38,
    forks: 9,
    url: "https://github.com",
    featured: false,
    testimonial: null,
  },
  {
    id: 3,
    title: "DevPath — AI Career Navigator",
    student: "Priya R.",
    cohort: "Spring 2025",
    description:
      "An AI-powered career path recommendation engine. Upload your resume, get matched with roles, skill gaps, and a custom learning plan.",
    longDescription:
      "DevPath ingests resumes via PDF parser, extracts skills with NLP (spaCy), matches against a role database (500+ roles scraped from LinkedIn/Glassdoor), and generates personalized learning roadmaps. Built with Next.js, PostgreSQL, and the OpenAI API for natural language recommendations.",
    tags: ["Next.js", "OpenAI", "PostgreSQL", "Tailwind"],
    image: null,
    stars: 52,
    forks: 14,
    url: "https://github.com",
    featured: true,
    testimonial: "DevPath got me my current job. The AI matched me with a role I hadn't considered, and the learning plan filled my gaps in 8 weeks.",
  },
  {
    id: 4,
    title: "CloudDeck — Infrastructure Dashboard",
    student: "Marcus T.",
    cohort: "Spring 2025",
    description:
      "Real-time cloud infrastructure monitoring dashboard. Tracks EC2, RDS, Lambda. Live metrics via AWS SDK + Chart.js.",
    longDescription:
      "CloudDeck provides a unified view of AWS resources with real-time metrics, cost tracking, and alerting. Uses AWS SDK to pull CloudWatch metrics, visualizes with Chart.js and D3.js for topology maps. Features multi-account support and a Slack integration for alerts.",
    tags: ["TypeScript", "AWS SDK", "React", "D3.js"],
    image: null,
    stars: 29,
    forks: 7,
    url: "https://github.com",
    featured: false,
    testimonial: null,
  },
  {
    id: 5,
    title: "FitSync — Workout Tracker",
    student: "Elena V.",
    cohort: "Winter 2025",
    description:
      "Full-stack workout tracking app with progress charts, social features, and a progressive web app (PWA) offline mode.",
    longDescription:
      "FitSync lets users log workouts, track progress with interactive charts, join challenges, and follow friends. Built as a PWA with offline-first architecture using IndexedDB sync. Features Apple Health integration, custom workout builder, and AI-powered exercise recommendations.",
    tags: ["Next.js", "Prisma", "SQLite", "PWA"],
    image: null,
    stars: 33,
    forks: 8,
    url: "https://github.com",
    featured: false,
    testimonial: null,
  },
  {
    id: 6,
    title: "CodeLint — PR Review Bot",
    student: "Danny W.",
    cohort: "Winter 2025",
    description:
      "A GitHub App that automatically lints PRs, enforces code style, and posts review comments. Supports ESLint, Prettier, and custom rules.",
    longDescription:
      "CodeLint installs as a GitHub App and runs lint checks on every PR. Auto-fixes trivial issues, posts inline review comments for complex ones, and enforces project-specific style guides. Supports ESLint, Prettier, Stylelint, and custom rules via config file. Handles 100+ concurrent PRs with queue-based processing.",
    tags: ["Node.js", "GitHub API", "Docker", "ESLint"],
    image: null,
    stars: 44,
    forks: 11,
    url: "https://github.com",
    featured: true,
    testimonial: "CodeLint is now used by 3 startups I know. It saves hours of code review time every week.",
  },
  {
    id: 7,
    title: "ChatBridge — Multi-Platform Messenger",
    student: "Lina N.",
    cohort: "Fall 2024",
    description:
      "Unified messaging interface for Slack, Discord, and Telegram. One dashboard to manage cross-platform conversations.",
    longDescription:
      "ChatBridge connects to Slack, Discord, and Telegram via their respective APIs, providing a unified inbox and send interface. Features message search across all platforms, scheduled messages, auto-reply templates, and analytics dashboard. Built with Event Sourcing pattern for reliable message delivery.",
    tags: ["React", "WebSocket", "OAuth", "Redis"],
    image: null,
    stars: 31,
    forks: 6,
    url: "https://github.com",
    featured: false,
    testimonial: null,
  },
  {
    id: 8,
    title: "TerraForma — Cloud Cost Optimizer",
    student: "Omar S.",
    cohort: "Fall 2024",
    description:
      "Terraform-based infrastructure cost analyzer. Scans existing .tf configs, estimates monthly costs, and suggests savings.",
    longDescription:
      "TerraForma parses Terraform configurations, maps resources to cloud provider pricing APIs, and generates monthly cost estimates. Identifies cost-saving opportunities like right-sizing instances, using reserved instances, and removing unused resources. Supports AWS, GCP, and Azure pricing.",
    tags: ["Terraform", "Go", "React", "GraphQL"],
    image: null,
    stars: 27,
    forks: 5,
    url: "https://github.com",
    featured: false,
    testimonial: null,
  },
];

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  const featured = projects.filter((p) => p.featured);

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

        {/* Featured projects */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-xs">★</span>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Featured Projects</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featured.map((p) => (
              <button
                key={p.id}
                onClick={() => setModalProject(p)}
                className="group text-left relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-950/30 to-cyan-950/20 border border-purple-500/30 p-5 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="absolute top-2 right-2">
                  <span className="text-yellow-500/60 text-xs">★ FEATURED</span>
                </div>
                <div className="text-2xl font-mono font-bold text-purple-400/30 group-hover:text-purple-300/50 transition-colors mb-3">
                  {'</>'}
                </div>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                  {p.title}
                </h3>
                <p className="text-[10px] font-mono text-gray-400 mb-2">
                  {p.student} · {p.cohort}
                </p>
                <p className="text-[11px] font-mono text-gray-500 leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950/30 border border-purple-800/20 text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Filter by tech</span>
            <span className="flex-1 border-t border-purple-900/20" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
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
        </div>

        {/* Stats + Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {projects.reduce((s, p) => s + p.forks, 0)}
              </div>
              <div className="text-[10px] font-mono text-gray-500 mt-1">Forks</div>
            </div>
          </div>

          {/* Project grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.filter(p => !p.featured).map((project) => (
              <div
                key={project.id}
                className="group rounded-xl bg-surface border border-purple-900/30 hover:border-purple-500/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-purple-500/5"
              >
                <div className="h-28 bg-gradient-to-br from-purple-950/40 to-cyan-950/30 flex items-center justify-center border-b border-purple-900/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative z-10 text-3xl font-mono font-bold text-purple-400/30 group-hover:text-purple-300/50 transition-colors">
                    {'</>'}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400">{project.student}</span>
                      <span className="text-[10px] font-mono text-gray-600 ml-2">{project.cohort}</span>
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

                  {!expanded && project.testimonial && (
                    <p className="text-[10px] text-purple-400/60 font-mono italic mb-2">
                      &ldquo;{project.testimonial.slice(0, 60)}&hellip;&rdquo;
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950/30 border border-purple-800/20 text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setModalProject(project)}
                    className="mt-3 text-[10px] font-mono text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View details →
                  </button>
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
              <button onClick={() => setActiveTag(null)} className="mt-4 text-xs font-mono text-purple-400 hover:text-purple-300 underline">
                Clear filter
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Project Detail Modal */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setModalProject(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-xl bg-surface border border-purple-900/30 shadow-2xl shadow-purple-900/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="h-32 bg-gradient-to-br from-purple-950/50 to-cyan-950/30 flex items-center justify-center border-b border-purple-900/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative z-10 text-5xl font-mono font-bold text-purple-400/20">{'</>'}</div>
              <button
                onClick={() => setModalProject(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/50 border border-purple-800/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-600/50 transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-cyan-400">{modalProject.student}</span>
                    <span className="text-[10px] font-mono text-gray-600">{modalProject.cohort}</span>
                    {modalProject.featured && (
                      <span className="text-[9px] font-mono text-yellow-500 border border-yellow-800/30 rounded px-1.5 py-0.5">Featured</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white">{modalProject.title}</h2>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-yellow-500">★ {modalProject.stars}</span>
                  <span className="text-gray-500">⑂ {modalProject.forks}</span>
                </div>
              </div>

              <p className="text-sm font-mono text-gray-400 leading-relaxed mb-4">
                {modalProject.longDescription}
              </p>

              {modalProject.testimonial && (
                <div className="mb-4 p-4 rounded-lg bg-purple-950/20 border border-purple-800/30">
                  <div className="text-[10px] font-mono text-purple-400 mb-1">Student testimonial</div>
                  <p className="text-xs font-mono text-gray-300 italic leading-relaxed">
                    &ldquo;{modalProject.testimonial}&rdquo;
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {modalProject.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-purple-950/30 border border-purple-800/20 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={modalProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold transition-colors"
              >
                <span className="text-[10px]">⎇</span>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}