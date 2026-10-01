"use client";

import { useState } from "react";

const navLinks = [
  { label: "Curriculum", href: "/curriculum" },
  { label: "Playground", href: "/playground" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Apply", href: "/apply" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-terminal border-b border-terminal-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-terminal-green/20 border border-terminal-border flex items-center justify-center">
              <span className="text-terminal-green font-bold text-sm font-mono">&gt;_</span>
            </div>
            <span className="text-base font-display font-bold text-terminal-text tracking-tight">
              Byteforge<span className="text-terminal-cyan">_</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-terminal-muted hover:text-terminal-green transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/apply"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-terminal-green/20 text-terminal-green text-sm font-semibold border border-terminal-green/30 hover:bg-terminal-green/30 transition-all duration-200"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-terminal-muted hover:bg-terminal-raised transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-terminal border-t border-terminal-border/50 animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-terminal-muted hover:bg-terminal-raised hover:text-terminal-green transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/apply"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-4 py-3 rounded-lg bg-terminal-green/20 text-terminal-green text-sm font-semibold"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}