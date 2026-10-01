"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";

const MODULES = [
  {
    title: "Software Engineering",
    subtitle: "FULL_STACK",
    description: "JavaScript, TypeScript, React, Node.js, Python, and cloud infrastructure.",
    duration: "16 wks",
  },
  {
    title: "Data Science & AI",
    subtitle: "ML_PIPELINE",
    description: "Python, pandas, scikit-learn, TensorFlow, LLMs, data engineering.",
    duration: "14 wks",
  },
  {
    title: "UX Design & Research",
    subtitle: "PRODUCT_DESIGN",
    description: "Design thinking, Figma, user research, prototyping, interaction design.",
    duration: "12 wks",
  },
];

const TERMINAL_LINES = [
  "# Byteforge Academy — initializing boot sequence...",
  "> loading curriculum engine...",
  "> career pipeline: ACTIVE",
  "> placement rate: 94% | avg salary: $82k",
  "> ready for winter 2026 cohort.",
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-terminal-bg text-terminal-text">
        {/* ===== HERO / Terminal ===== */}
        <section
          ref={heroRef}
          className="relative min-h-[70vh] flex items-center overflow-hidden border-b border-terminal-border"
        >
          {/* grid bg */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 grid-bg" />
          </div>

          {/* Glow accents */}
          <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-terminal-green/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-terminal-cyan/5 blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-24">
            <div className="max-w-4xl mx-auto">
              {/* Terminal header bar */}
              <div
                className={`mb-3 transition-all duration-700 ${
                  mounted ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-raised/80 border border-terminal-border">
                  <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
                  <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
                  <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
                  <span className="ml-3 text-xs font-mono text-terminal-muted">bash — byteforge-academy 80×24</span>
                </div>
              </div>

              {/* Terminal lines */}
              <div className="space-y-1.5 mb-8">
                {TERMINAL_LINES.map((line, i) => (
                  <p
                    key={i}
                    className={`text-xs font-mono leading-relaxed transition-all duration-500 delay-${i * 100} ${
                      mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    } ${i === 0 ? "text-terminal-green" : i === 4 ? "text-terminal-cyan" : "text-terminal-muted"}`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Headline */}
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-5 transition-all duration-700 delay-100 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Code your
                <br />
                <span className="text-gradient">future</span>.
              </h1>

              <p
                className={`text-base sm:text-lg text-terminal-muted max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-200 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Byteforge Academy is the most intensive, career-focused coding bootcamp.
                16 weeks to go from beginner to job-ready. No degree required.
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <a
                  href="/apply"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-terminal-green text-terminal-bg text-base font-semibold shadow-glow-green hover:scale-105 transition-all duration-200"
                >
                  Apply Now — Free to Start
                  <span className="font-mono text-xs opacity-70 blink-cursor">&gt;</span>
                </a>
                <a
                  href="/curriculum"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-terminal-border text-terminal-muted text-base font-semibold hover:border-terminal-green hover:text-terminal-green transition-all duration-200"
                >
                  View Programs
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>

              {/* Trust bar */}
              <div
                className={`mt-12 pt-6 border-t border-terminal-border/50 transition-all duration-700 delay-500 ${
                  mounted ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-xs font-mono text-terminal-dim mb-3">
                  <span className="text-terminal-green">$</span> cat graduates_employers.txt
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-terminal-dim">
                  {["Google", "Stripe", "Airbnb", "Figma", "Meta", "Notion"].map((company) => (
                    <span key={company} className="text-xs font-mono text-terminal-muted/60 hover:text-terminal-green transition-colors">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MODULES / Programs ===== */}
        <section className="relative py-20 lg:py-28 bg-terminal-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-mono text-terminal-dim mb-4">
                <span className="text-terminal-green">$</span> ls -la /curriculum
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-terminal-text mb-4">
                Choose your path
              </h2>
              <p className="text-base text-terminal-muted max-w-2xl mx-auto">
                Three intensive tracks — zero to job-ready in weeks.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {MODULES.map((mod, i) => (
                <a
                  key={mod.title}
                  href={`/curriculum/${mod.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "")}`}
                  className={`group relative rounded-xl p-8 bg-terminal-raised/60 border border-terminal-border hover:border-terminal-green/50 transition-all duration-300 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                    <span className="text-xs font-mono text-terminal-cyan uppercase tracking-wider">
                      {mod.subtitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-terminal-text mt-1 mb-3">{mod.title}</h3>
                  <p className="text-terminal-muted text-sm leading-relaxed mb-5">{mod.description}</p>
                  <div className="flex items-center gap-2 text-xs font-mono text-terminal-dim">
                    <span className="text-terminal-green">&gt;</span> {mod.duration}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OUTCOMES ===== */}
        <section className="relative py-20 lg:py-28 bg-terminal-bg overflow-hidden border-t border-terminal-border">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-mono text-terminal-dim mb-4">
                <span className="text-terminal-green">$</span> ./outcomes --report
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-terminal-text mb-4">
                Results that speak
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { stat: "94%", label: "placement rate" },
                { stat: "$82k", label: "avg starting salary" },
                { stat: "600+", label: "hiring partners" },
                { stat: "4.9/5", label: "satisfaction" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`text-center p-8 rounded-xl bg-terminal-raised/40 border border-terminal-border/60 hover:border-terminal-green/30 transition-all duration-300 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <span className="text-4xl font-display font-bold text-terminal-green block mb-2">{item.stat}</span>
                  <span className="text-sm font-mono text-terminal-muted">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="/outcomes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-terminal-border text-terminal-muted text-sm font-semibold hover:border-terminal-green hover:text-terminal-green transition-all"
              >
                <span className="font-mono text-xs text-terminal-green">$</span> See full calculator
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="py-12 border-t border-terminal-border bg-terminal-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-mono text-terminal-dim">
              <span className="text-terminal-green">$</span> echo &quot;Byteforge Academy © 2026 — built with care&quot;
            </p>
            <p className="text-xs font-mono text-terminal-dim mt-2">
              byteforge-academy v1.0.0 — <span className="text-terminal-cyan">MIT</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}