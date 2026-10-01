"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";

const MODULES = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    subtitle: "FULL_STACK",
    description:
      "Master JavaScript, TypeScript, React, Node.js, Python, and cloud infrastructure. Build production-grade apps from day one.",
    duration: "16 weeks • Full-time",
    lessons: [
      "Week 1 — Web fundamentals & JavaScript deep dive",
      "Week 2 — TypeScript & static typing",
      "Week 3 — React & component design",
      "Week 4 — State management & APIs",
      "Week 5 — Node.js & Express",
      "Week 6 — Databases (SQL & NoSQL)",
      "Week 7 — Authentication & authorization",
      "Week 8 — Testing & CI/CD",
      "Week 9 — Cloud deployment (AWS/Vercel)",
      "Week 10 — Real-time apps & WebSockets",
      "Week 11 — Microservices architecture",
      "Week 12 — Capstone planning",
      "Week 13-14 — Capstone build sprint",
      "Week 15 — Code review & optimization",
      "Week 16 — Demo day & career prep",
    ],
  },
  {
    id: "data-science-ai",
    title: "Data Science & AI",
    subtitle: "ML_PIPELINE",
    description:
      "Python, pandas, scikit-learn, TensorFlow, LLMs, and data engineering at scale.",
    duration: "14 weeks • Full-time",
    lessons: [
      "Week 1 — Python for data science",
      "Week 2 — NumPy & pandas fundamentals",
      "Week 3 — Data visualization (matplotlib/seaborn)",
      "Week 4 — Statistical analysis & probability",
      "Week 5 — Machine learning basics (scikit-learn)",
      "Week 6 — Supervised learning algorithms",
      "Week 7 — Unsupervised learning & clustering",
      "Week 8 — Deep learning with TensorFlow",
      "Week 9 — Neural networks & CNNs",
      "Week 10 — NLP & LLMs",
      "Week 11 — Data engineering & pipelines",
      "Week 12 — MLOps & model deployment",
      "Week 13 — Capstone project",
      "Week 14 — Demo day & career prep",
    ],
  },
  {
    id: "ux-design-research",
    title: "UX Design & Research",
    subtitle: "PRODUCT_DESIGN",
    description:
      "Design thinking, Figma mastery, user research, prototyping, and interaction design.",
    duration: "12 weeks • Full-time",
    lessons: [
      "Week 1 — Design thinking fundamentals",
      "Week 2 — User research methods",
      "Week 3 — Information architecture",
      "Week 4 — Wireframing & prototyping (Figma)",
      "Week 5 — Visual design & typography",
      "Week 6 — Interaction design",
      "Week 7 — Usability testing",
      "Week 8 — Accessibility & inclusive design",
      "Week 9 — Data-driven design",
      "Week 10 — Portfolio workshop",
      "Week 11 — Client project",
      "Week 12 — Demo day & career prep",
    ],
  },
];

export default function CurriculumPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-terminal-bg text-terminal-text pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Terminal header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-raised/80 border border-terminal-border mb-4">
              <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
              <span className="ml-3 text-xs font-mono text-terminal-muted">bash — ls /curriculum/</span>
            </div>
            <p className="text-xs font-mono text-terminal-green mb-2">
              $ cat curriculum_overview.md
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-bold text-terminal-text mb-2">
            Curriculum
          </h1>
          <p className="text-base text-terminal-muted max-w-2xl mb-12">
            Choose a module below to explore the full lesson outline.
          </p>

          {/* Module cards */}
          <div className="space-y-8">
            {MODULES.map((mod, i) => (
              <a
                key={mod.id}
                href={`/curriculum/${mod.id}`}
                className={`block rounded-xl p-8 bg-terminal-raised/60 border border-terminal-border hover:border-terminal-green/50 hover:shadow-glow-green transition-all duration-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                  <span className="text-xs font-mono text-terminal-cyan uppercase">{mod.subtitle}</span>
                  <span className="text-xs font-mono text-terminal-dim">// {mod.duration}</span>
                </div>
                <h2 className="text-2xl font-bold text-terminal-text mb-3">{mod.title}</h2>
                <p className="text-terminal-muted text-sm leading-relaxed mb-4">{mod.description}</p>
                <div className="flex items-center gap-2 text-xs font-mono text-terminal-dim">
                  <span className="text-terminal-green">&gt;</span> {mod.lessons.length} lessons
                  <span className="text-terminal-dim">— click to expand</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}