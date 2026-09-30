"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import CodingChallenge from "@/components/CodingChallenge";

const programs = [
  {
    title: "Software Engineering",
    subtitle: "FULL-STACK",
    description:
      "JavaScript, TypeScript, React, Node.js, Python, Go, cloud infra. Ship production code from week 1. Build your portfolio with real PRs.",
    duration: "16 weeks • Full-time",
    modules: 12,
    color: "from-purple-500 to-purple-700",
    glow: "shadow-purple-500/20",
  },
  {
    title: "Data Science & AI",
    subtitle: "ML / AI",
    description:
      "Python, pandas, scikit-learn, TensorFlow, LLMs, RAG pipelines. From zero to deploying models in production. Build an ML portfolio.",
    duration: "14 weeks • Full-time",
    modules: 10,
    color: "from-cyan-500 to-cyan-700",
    glow: "shadow-cyan-500/20",
  },
  {
    title: "Systems & Infrastructure",
    subtitle: "DEVOPS",
    description:
      "Linux, Docker, Kubernetes, CI/CD, Terraform, cloud architecture. Become the engineer who ships and runs what they build.",
    duration: "12 weeks • Full-time",
    modules: 9,
    color: "from-emerald-500 to-emerald-700",
    glow: "shadow-emerald-500/20",
  },
];

const outcomes = [
  { stat: "94%", label: "placed within 6 months", icon: "🚀" },
  { stat: "$85k", label: "median starting salary", icon: "💰" },
  { stat: "600+", label: "hiring partners", icon: "🏢" },
  { stat: "4.9/5", label: "student satisfaction", icon: "⭐" },
];

const features = [
  {
    title: "Live Code Reviews",
    desc: "Every PR gets reviewed by senior engineers. Real feedback, real improvement.",
    icon: "⎇",
  },
  {
    title: "Mock Interviews",
    desc: "Weekly whiteboard and system design sessions with FAANG engineers.",
    icon: "⚡",
  },
  {
    title: "Career Accelerator",
    desc: "Resume clinic, LinkedIn optimization, salary negotiation workshop.",
    icon: "◆",
  },
  {
    title: "Alumni Network",
    desc: "Join 2,000+ builders at Google, Stripe, Airbnb, and more.",
    icon: "⬡",
  },
];

const cohortDeadline = "Dec 15, 2026";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "> bootcamp.init()";

  useEffect(() => {
    setMounted(true);
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Nav />

      <main>
        {/* ===== HERO ===== */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-surface">
          {/* Scan lines overlay */}
          <div className="absolute inset-0 scan-line pointer-events-none z-10" />

          {/* Grid BG */}
          <div className="absolute inset-0 bg-grid opacity-60" />

          {/* Glow orbs */}
          <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />

          {/* Terminal decorations */}
          <div className="absolute top-28 left-8 hidden lg:block">
            <div className="font-mono text-[10px] text-gray-600 leading-relaxed opacity-40">
              {`┌─[byteforge@terminal]─[~/bootcamp]`}
              <br />
              {`├─ $ `}<span className="text-purple-400">cat</span> <span className="text-cyan-400">welcome.txt</span>
            </div>
          </div>
          <div className="absolute bottom-32 right-8 hidden lg:block">
            <div className="font-mono text-[10px] text-gray-600 leading-relaxed opacity-30">
              {`└─[${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,'0')}-${String(new Date().getDate()).padStart(2,'0')}]`}
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28 w-full">
            <div className="max-w-4xl mx-auto text-center">
              {/* Terminal badge */}
              <div
                className={`inline-flex items-center gap-3 px-4 py-2 rounded-md bg-purple-950/40 border border-purple-800/40 font-mono text-xs mb-10 transition-all duration-700 ${
                  mounted ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400">SYSTEM</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-300">
                  Applications open:{" "}
                  <span className="text-cyan-300">{cohortDeadline}</span>
                </span>
              </div>

              {/* Terminal-style prompt */}
              <div className="font-mono text-sm text-gray-500 mb-2 text-left max-w-xl mx-auto">
                <span className="text-green-400">visitor@byteforge</span>
                <span className="text-gray-600">:</span>
                <span className="text-purple-300">~</span>
                <span className="text-gray-600">$ </span>
                {typedText}
                <span className="typing-cursor" />
              </div>

              {/* Headline */}
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight mb-6 transition-all duration-700 delay-100 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="text-white">Ship. Build.</span>
                <br />
                <span className="text-gradient">Deploy.</span>
                <span className="text-white"> Repeat.</span>
              </h1>

              {/* Subhead */}
              <p
                className={`text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 font-mono transition-all duration-700 delay-200 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Byteforge Academy is the terminal-to-production coding bootcamp.
                16 weeks. Real code. Real PRs. Real career. No degree required.
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <a
                  href="/admissions"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-base font-semibold shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200"
                >
                  <span className="font-mono text-xs opacity-70">$</span>
                  Apply Now — Free to Start
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/curriculum"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-lg border border-purple-700/50 text-gray-300 text-base font-mono text-sm hover:bg-purple-950/30 hover:border-purple-500/50 transition-all duration-200"
                >
                  <span className="text-purple-400">#</span>
                  View Curriculum
                </a>
              </div>

              {/* Code snippet preview */}
              <div
                className={`mt-16 max-w-lg mx-auto transition-all duration-700 delay-500 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="rounded-lg bg-surface-light border border-purple-900/30 overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-purple-900/20 bg-surface/50">
                    <span className="w-3 h-3 rounded-full bg-red-500/50" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <span className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-3 font-mono text-[10px] text-gray-500">career.ts</span>
                  </div>
                  <div className="px-4 py-3 font-mono text-xs leading-relaxed">
                    <div>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-cyan-300">future</span>{" "}
                      <span className="text-gray-500">=</span>{" "}
                      <span className="text-yellow-300">await</span>{" "}
                      <span className="text-green-400">Byteforge</span>
                      <span className="text-gray-500">.</span>
                      <span className="text-purple-300">build</span>
                      <span className="text-gray-500">(</span>
                      <span className="text-yellow-200">you</span>
                      <span className="text-gray-500">)</span>
                    </div>
                    <div>
                      <span className="text-gray-600">// &gt; Career deployed successfully 🚀</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust bar */}
              <div
                className={`mt-12 pt-8 border-t border-purple-900/30 transition-all duration-700 delay-700 ${
                  mounted ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-4">
                  # graduates ship at
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                  {["Google", "Stripe", "Airbnb", "Figma", "Meta"].map((company) => (
                    <span key={company} className="text-xs font-mono font-semibold tracking-tight text-gray-500 hover:text-purple-300 transition-colors">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== LIVE CODE CHALLENGE (in-page) ===== */}
        <section className="relative py-24 lg:py-28 bg-surface border-t border-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded bg-purple-950/50 border border-purple-800/40 text-purple-300 text-[10px] font-mono uppercase tracking-wider mb-4">
                TRY THIS — LIVE CODING CHALLENGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Write code. Get instant feedback.
              </h2>
              <p className="text-sm text-gray-400 font-mono max-w-xl mx-auto">
                Solve a real JavaScript kata right here in the browser.
                No setup. No login. Just ship.
              </p>
            </div>
            <CodingChallenge />
          </div>
        </section>

        {/* ===== PROGRAMS ===== */}
        <section id="programs" className="relative py-24 lg:py-32 bg-surface-light border-t border-purple-900/20">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded bg-purple-950/50 border border-purple-800/40 text-purple-300 text-[10px] font-mono uppercase tracking-wider mb-4">
                PROGRAMS
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Choose your <span className="text-gradient">terminal</span>
              </h2>
              <p className="text-sm text-gray-400 font-mono max-w-2xl mx-auto">
                Three intensive tracks. Each one ends with you shipping a production app to your portfolio.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {programs.map((program, i) => (
                <div
                  key={program.title}
                  className={`group relative rounded-xl p-8 bg-surface border border-purple-900/30 hover:border-purple-500/50 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${program.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${program.color} flex items-center justify-center text-black font-mono text-xs font-bold`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-widest">
                      {program.subtitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1 mb-3">{program.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{program.description}</p>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-purple-400" />
                      {program.duration}
                    </span>
                    <span className="text-purple-400">
                      {program.modules} modules
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OUTCOMES ===== */}
        <section id="outcomes" className="relative py-24 lg:py-32 bg-surface overflow-hidden">
          <div className="absolute inset-0 bg-grid-white opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/2 blur-[150px]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded bg-purple-950/50 border border-purple-800/40 text-purple-300 text-[10px] font-mono uppercase tracking-wider mb-4">
                REAL OUTCOMES
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Results that <span className="text-cyan-400">compile</span>
              </h2>
              <p className="text-sm text-gray-400 font-mono">
                Our graduates build careers at the world&apos;s best engineering orgs.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {outcomes.map((item, i) => (
                <div
                  key={item.label}
                  className={`text-center p-8 rounded-xl bg-surface border border-purple-900/30 hover:border-cyan-500/30 transition-all duration-300 group ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="text-3xl mb-1">{item.icon}</div>
                  <div className="text-4xl font-black text-white mb-1 font-mono">{item.stat}</div>
                  <div className="text-xs text-gray-500 font-mono">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Feature grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feat, i) => (
                <div
                  key={feat.title}
                  className={`p-6 rounded-xl bg-surface-light border border-purple-900/20 hover:border-purple-700/40 transition-all duration-300 group ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(i + 5) * 100}ms` }}
                >
                  <div className="text-purple-400 font-mono text-lg mb-3">{feat.icon}</div>
                  <h3 className="text-sm font-bold text-white mb-1">{feat.title}</h3>
                  <p className="text-xs text-gray-500 font-mono leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== APPLY CTA ===== */}
        <section id="apply" className="relative py-24 lg:py-32 bg-surface-light border-t border-purple-900/20">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-purple-950/40 border border-purple-800/40 font-mono text-xs mb-8">
              <span className="text-green-400">●</span>
              <span className="text-gray-400">{cohortDeadline}</span>
              <span className="text-gray-600">|</span>
              <span className="text-cyan-300">0 spots remaining</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to <span className="text-gradient">ship</span> your future?
            </h2>
            <p className="text-base text-gray-400 font-mono max-w-xl mx-auto mb-10">
              Applications are reviewed on a rolling basis. The Winter 2026 cohort starts January 12.
              No upfront tuition — pay after you land a job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/admissions"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-base font-semibold shadow-xl shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200"
              >
                <span className="font-mono text-xs opacity-70">$ ./apply</span>
                Start Your Application
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/curriculum"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg border border-purple-700/50 text-gray-300 font-mono text-sm hover:bg-purple-950/30 hover:border-purple-500/50 transition-all duration-200"
              >
                <span className="text-purple-400">#</span>
                Read the Syllabus
              </a>
            </div>

            {/* Footer terminal line */}
            <div className="mt-16 font-mono text-[10px] text-gray-600">
              <span className="text-gray-500">└─[EOF]─[byteforge@terminal:~/bootcamp]─[build successful]</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}