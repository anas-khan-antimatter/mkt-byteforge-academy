"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";

const programs = [
  {
    title: "Software Engineering",
    subtitle: "Full-Stack Immersive",
    description:
      "Master JavaScript, TypeScript, React, Node.js, Python, and cloud infrastructure. Build production-grade apps from day one.",
    duration: "16 weeks • Full-time",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Data Science & AI",
    subtitle: "Machine Learning Track",
    description:
      "Go from zero to building ML pipelines. Python, pandas, scikit-learn, TensorFlow, LLMs, and data engineering at scale.",
    duration: "14 weeks • Full-time",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "UX Design & Research",
    subtitle: "Product Design Track",
    description:
      "Design thinking, Figma mastery, user research, prototyping, and interaction design. Ship portfolios that land design roles.",
    duration: "12 weeks • Full-time",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

const outcomes = [
  { stat: "94%", label: "Job placement within 6 months" },
  { stat: "$82k", label: "Average starting salary" },
  { stat: "600+", label: "Hiring partner companies" },
  { stat: "4.9/5", label: "Student satisfaction rating" },
];

const highlights = [
  {
    title: "Project-Based Curriculum",
    description: "Ship 4 portfolio projects and a capstone. Real code, real PRs, real impact.",
  },
  {
    title: "1:1 Career Coaching",
    description: "Dedicated coach from week one — resume, LinkedIn, mock interviews, salary negotiation.",
  },
  {
    title: "Lifetime Alumni Network",
    description: "Join 2,000+ alumni at companies like Google, Stripe, Airbnb, and Figma.",
  },
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

      <main>
        {/* ===== HERO ===== */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-grid opacity-40" />

          {/* Floating gradient orbs */}
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-300/30 to-accent-300/20 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-accent-300/20 to-brand-300/30 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-40 lg:pb-28">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/80 border border-brand-200/50 text-brand-700 text-xs font-medium mb-8 transition-all duration-700 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                Now accepting applications for Winter 2026 cohort
              </div>

              {/* Headline */}
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-[1.05] tracking-tight mb-6 transition-all duration-700 delay-100 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="text-brand-950">Code your</span>
                <br />
                <span className="text-gradient">future</span>
                <span className="text-brand-950">.</span>
              </h1>

              {/* Subhead */}
              <p
                className={`text-lg sm:text-xl text-brand-700/80 max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-200 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Byteforge Academy is the most intensive, career-focused coding bootcamp.
                16 weeks to go from beginner to job-ready software engineer, data scientist, or designer.
                No degree required. No experience necessary.
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 text-white text-base font-semibold shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 transition-all duration-200"
                >
                  Apply Now — It&apos;s Free to Start
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#programs"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-brand-200 text-brand-700 text-base font-semibold hover:border-brand-400 hover:bg-brand-50/50 transition-all duration-200"
                >
                  View Programs
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>

              {/* Trust bar */}
              <div
                className={`mt-16 pt-8 border-t border-brand-100 transition-all duration-700 delay-500 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-widest text-brand-400 mb-4">
                  Our graduates work at
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-brand-300">
                  {["Google", "Stripe", "Airbnb", "Figma", "Meta", "Notion"].map((company) => (
                    <span key={company} className="text-sm font-semibold tracking-tight text-brand-400/60">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROGRAMS ===== */}
        <section id="programs" className="relative py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-4">
                Our Programs
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-brand-950 mb-4">
                Choose your path
              </h2>
              <p className="text-lg text-brand-600 max-w-2xl mx-auto">
                Three intensive tracks designed to take you from zero to job-ready in weeks, not years.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {programs.map((program, i) => (
                <div
                  key={program.title}
                  className={`group relative rounded-2xl p-8 bg-white border-2 border-brand-100 hover:border-brand-300 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center text-brand-600 group-hover:from-brand-500 group-hover:to-accent-500 group-hover:text-white transition-all duration-300 mb-6">
                    {program.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-accent-600 uppercase tracking-wider">
                    {program.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-brand-950 mt-1 mb-3">{program.title}</h3>
                  <p className="text-brand-600 text-sm leading-relaxed mb-5">{program.description}</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-brand-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {program.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OUTCOMES ===== */}
        <section id="outcomes" className="relative py-24 lg:py-32 bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0 bg-grid" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-800/50 text-brand-300 text-xs font-semibold uppercase tracking-wider border border-brand-700/50 mb-4">
                Real Outcomes
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                Results that speak
              </h2>
              <p className="text-lg text-brand-300 max-w-2xl mx-auto">
                Our graduates go on to build careers at the world&apos;s best companies.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {outcomes.map((item, i) => (
                <div
                  key={item.label}
                  className={`text-center p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="text-4xl sm:text-5xl font-display font-black text-gradient mb-2">{item.stat}</div>
                  <p className="text-sm text-brand-300 leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map((item, i) => (
                <div
                  key={item.title}
                  className={`p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-500/30 transition-all duration-300 ${
                    mounted ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 200}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-300 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== APPLY CTA ===== */}
        <section
          id="apply"
          className="relative py-24 lg:py-32 bg-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-brand-200/40 to-accent-200/40 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-wider mb-4">
              Start Your Journey
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brand-950 mb-6">
              Ready to build your future?
            </h2>
            <p className="text-lg text-brand-600 mb-10 max-w-xl mx-auto">
              Applications are open for our Winter 2026 cohort. No coding experience? No problem.
              We teach you everything from scratch.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 text-white text-lg font-semibold shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-105 transition-all duration-200"
              >
                Apply Free Today
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            <p className="mt-6 text-sm text-brand-400">
              No upfront tuition. Pay only after you land a job — starting at $0 down.
            </p>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="bg-brand-950 border-t border-brand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs font-mono">&lt;/&gt;</span>
                </div>
                <span className="text-sm font-display font-bold text-white">
                  Byteforge<span className="text-accent-500">_</span>
                </span>
              </div>
              <p className="text-sm text-brand-400">
                &copy; {new Date().getFullYear()} Byteforge Academy. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}