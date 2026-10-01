"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";

export default function EducationPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-terminal-bg text-terminal-text pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-8 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-raised/80 border border-terminal-border mb-4">
              <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
              <span className="ml-3 text-xs font-mono text-terminal-muted">bash — cat /education/philosophy.md</span>
            </div>
            <p className="text-xs font-mono text-terminal-green mb-2">$ cat /education/philosophy.md</p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold text-terminal-text mb-2">
            Education Philosophy
          </h1>
          <p className="text-base text-terminal-muted max-w-2xl mb-8">
            How Byteforge Academy transforms beginners into job-ready technologists.
          </p>

          <div className="space-y-8">
            {[
              {
                title: "Project-Based Learning",
                desc: "Every concept is reinforced by building real projects. You'll ship four portfolio projects and a capstone that demonstrates your skills to employers.",
                cmd: "cat /education/project-based.md",
              },
              {
                title: "Mentorship Model",
                desc: "Each student is paired with an industry mentor who provides 1:1 guidance, code reviews, and career advice throughout the program and beyond.",
                cmd: "cat /education/mentorship.md",
              },
              {
                title: "Career-First Curriculum",
                desc: "Our curriculum is designed backwards from what employers need. Every module maps to real job requirements, and career coaching starts on day one.",
                cmd: "cat /education/career-first.md",
              },
              {
                title: "Lifetime Access",
                desc: "Graduates get lifetime access to course materials, alumni network, hiring partners, and continued career support — no fees, no expiration.",
                cmd: "cat /education/lifetime-access.md",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-xl p-6 bg-terminal-raised/60 border border-terminal-border hover:border-terminal-green/30 transition-all duration-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-terminal-green">$</span>
                  <span className="text-xs font-mono text-terminal-dim">{item.cmd}</span>
                </div>
                <h2 className="text-xl font-bold text-terminal-text mb-3">{item.title}</h2>
                <p className="text-sm font-mono text-terminal-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-terminal-green text-terminal-bg text-base font-semibold shadow-glow-green hover:scale-105 transition-all duration-200"
            >
              Apply Now
              <span className="font-mono text-xs opacity-70">&gt;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}