"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";

const MODULES: Record<string, { title: string; subtitle: string; lessons: string[] }> = {
  "software-engineering": {
    title: "Software Engineering",
    subtitle: "FULL_STACK",
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
  "data-science-ai": {
    title: "Data Science & AI",
    subtitle: "ML_PIPELINE",
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
  "ux-design-research": {
    title: "UX Design & Research",
    subtitle: "PRODUCT_DESIGN",
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
};

export default function ModulePage({ params }: { params: { module: string } }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const mod = MODULES[params.module];
  if (!mod) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-terminal-bg text-terminal-text pt-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-xs font-mono text-terminal-red mb-4">
              $ cat /curriculum/{params.module} 2&gt;&amp;1
            </p>
            <h1 className="text-3xl font-display font-bold text-terminal-text mb-4">
              Module not found
            </h1>
            <p className="text-terminal-muted mb-8">The module &quot;{params.module}&quot; does not exist.</p>
            <Link href="/curriculum" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-green transition-all">
              <span className="font-mono text-xs text-terminal-green">$</span> cd .. &amp;&amp; ls /curriculum/
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-terminal-bg text-terminal-text pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Terminal breadcrumb */}
          <div
            className={`mb-8 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-raised/80 border border-terminal-border mb-4">
              <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
              <span className="ml-3 text-xs font-mono text-terminal-muted">
                bash — cat /curriculum/{params.module}/syllabus.md
              </span>
            </div>
            <p className="text-xs font-mono text-terminal-green mb-2">
              $ cat /curriculum/{mod.subtitle.toLowerCase()}/syllabus.md
            </p>
          </div>

          {/* Header */}
          <Link
            href="/curriculum"
            className="text-xs font-mono text-terminal-dim hover:text-terminal-green transition-colors mb-6 inline-block"
          >
            <span className="text-terminal-green">$</span> cd .. &amp;&amp; ls
          </Link>

          <h1
            className={`text-3xl sm:text-4xl font-display font-bold text-terminal-text mb-2 transition-all duration-600 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {mod.title}
          </h1>

          <div className="flex items-center gap-3 mb-10">
            <span className="text-xs font-mono text-terminal-cyan uppercase px-3 py-1 rounded bg-terminal-green/10 border border-terminal-border">
              {mod.subtitle}
            </span>
            <span className="text-xs font-mono text-terminal-dim">
              {mod.lessons.length} lessons
            </span>
          </div>

          {/* Lessons list */}
          <div
            className={`space-y-3 transition-all duration-600 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {mod.lessons.map((lesson, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-4 rounded-lg bg-terminal-raised/40 border border-terminal-border/60 hover:border-terminal-green/30 transition-all duration-300 ${
                  mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${(i + 1) * 60}ms` }}
              >
                <span className="text-xs font-mono text-terminal-dim w-8 text-right">{i + 1}.</span>
                <div className="flex-1">
                  <span className="text-sm font-mono text-terminal-text">{lesson}</span>
                </div>
                <span className="text-xs font-mono text-terminal-green/50">[ ]</span>
              </div>
            ))}
          </div>

          {/* Code sample at bottom */}
          <div
            className={`mt-12 p-6 rounded-xl bg-terminal-raised/60 border border-terminal-border transition-all duration-600 delay-400 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
              <span className="ml-3 text-xs font-mono text-terminal-muted">
                sample — {mod.title.toLowerCase().replace(/\s+/g, "-")}.ts
              </span>
            </div>
            <pre className="text-xs font-mono text-terminal-muted leading-relaxed overflow-x-auto">
              <span className="text-terminal-green">// {mod.title} — sample code</span>
              {`
  const academy = new ByteforgeAcademy({
    track: "${mod.subtitle}",
    cohort: "winter-2026",
  });

  academy.on("graduate", (student) => {
    console.log(\`\${student.name} placed at \${student.company}\`);
  });

  await academy.train();
  `}
            </pre>
          </div>

          <div className="mt-10 text-center">
            <a
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-terminal-green text-terminal-bg text-base font-semibold shadow-glow-green hover:scale-105 transition-all duration-200"
            >
              Apply for {mod.title}
              <span className="font-mono text-xs opacity-70">&gt;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}