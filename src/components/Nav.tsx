"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Projects", href: "/projects" },
  { label: "Admissions", href: "/admissions" },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow duration-300">
              <span className="text-black font-bold text-sm font-mono">&lt;/&gt;</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Byteforge<span className="text-cyan-400">_</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-purple-300 bg-purple-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-px left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
                )}
              </a>
            ))}
            <a
              href="/admissions"
              className="ml-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200"
            >
              Apply Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
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
        <div className="md:hidden glass border-t border-purple-900/30">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-purple-300 bg-purple-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admissions"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold shadow-lg"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}