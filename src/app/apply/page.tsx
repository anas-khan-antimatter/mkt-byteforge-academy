"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";

export default function ApplyPage() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "software-engineering",
    experience: "",
    reason: "",
  });

  useEffect(() => { setMounted(true); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error — could not reach /api/apply");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-terminal-bg text-terminal-text pt-28">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-raised/80 border border-terminal-border mb-6 w-fit mx-auto">
              <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
              <span className="ml-3 text-xs font-mono text-terminal-muted">bash — ./apply --status</span>
            </div>
            <p className="text-xs font-mono text-terminal-green mb-4">
              $ echo &quot;application submitted ✓&quot;
            </p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-terminal-text mb-4">
              Application Received
            </h1>
            <div className="p-6 rounded-xl bg-terminal-green/10 border border-terminal-green/30 mb-6">
              <p className="text-sm font-mono text-terminal-green">
                ✓ Your application has been submitted successfully.
              </p>
            </div>
            <p className="text-terminal-muted text-sm leading-relaxed mb-8">
              Our admissions team will review your application and reach out within 3–5 business days.
              Keep an eye on your inbox for next steps.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-green transition-all"
            >
              <span className="font-mono text-xs text-terminal-green">$</span> cd /home
            </a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-terminal-bg text-terminal-text pt-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Terminal header */}
          <div
            className={`mb-8 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-raised/80 border border-terminal-border mb-4">
              <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
              <span className="ml-3 text-xs font-mono text-terminal-muted">
                bash — ./apply --interactive
              </span>
            </div>
            <p className="text-xs font-mono text-terminal-green mb-2">
              $ cat /apply/README.md
            </p>
            <p className="text-xs font-mono text-terminal-dim mb-6">
              Fill out the form below to apply for Byteforge Academy. All fields are required.
            </p>
          </div>

          <h1
            className={`text-3xl sm:text-4xl font-display font-bold text-terminal-text mb-6 transition-all duration-600 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Apply to Byteforge
          </h1>

          <form
            onSubmit={handleSubmit}
            className={`space-y-5 transition-all duration-600 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Name */}
            <div>
              <label className="block text-xs font-mono text-terminal-dim mb-1">
                $ read --prompt=&quot;full name: &quot;
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-lg bg-terminal-raised/60 border border-terminal-border text-terminal-text font-mono text-sm focus:border-terminal-green focus:ring-1 focus:ring-terminal-green/30 transition-all placeholder:text-terminal-dim"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-mono text-terminal-dim mb-1">
                $ read --prompt=&quot;email: &quot;
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="jane@example.com"
                className="w-full px-4 py-3 rounded-lg bg-terminal-raised/60 border border-terminal-border text-terminal-text font-mono text-sm focus:border-terminal-green focus:ring-1 focus:ring-terminal-green/30 transition-all placeholder:text-terminal-dim"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-mono text-terminal-dim mb-1">
                $ read --prompt=&quot;phone: &quot;
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-lg bg-terminal-raised/60 border border-terminal-border text-terminal-text font-mono text-sm focus:border-terminal-green focus:ring-1 focus:ring-terminal-green/30 transition-all placeholder:text-terminal-dim"
              />
            </div>

            {/* Program */}
            <div>
              <label className="block text-xs font-mono text-terminal-dim mb-1">
                $ select --prompt=&quot;program: &quot;
              </label>
              <select
                name="program"
                value={form.program}
                onChange={(e) => setForm({ ...form, program: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg bg-terminal-raised/60 border border-terminal-border text-terminal-text font-mono text-sm focus:border-terminal-green focus:ring-1 focus:ring-terminal-green/30 transition-all"
              >
                <option value="software-engineering">Software Engineering</option>
                <option value="data-science-ai">Data Science &amp; AI</option>
                <option value="ux-design-research">UX Design &amp; Research</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-mono text-terminal-dim mb-1">
                $ cat &gt; experience.txt
              </label>
              <textarea
                name="experience"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                required
                placeholder="Tell us about your background, any coding experience, and why you're interested..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-terminal-raised/60 border border-terminal-border text-terminal-text font-mono text-sm focus:border-terminal-green focus:ring-1 focus:ring-terminal-green/30 transition-all placeholder:text-terminal-dim resize-none"
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-mono text-terminal-dim mb-1">
                $ cat &gt; reason.txt
              </label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                required
                placeholder="Why do you want to join Byteforge Academy?"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-terminal-raised/60 border border-terminal-border text-terminal-text font-mono text-sm focus:border-terminal-green focus:ring-1 focus:ring-terminal-green/30 transition-all placeholder:text-terminal-dim resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 rounded-lg bg-terminal-red/10 border border-terminal-red/30">
                <p className="text-xs font-mono text-terminal-red">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 rounded-lg bg-terminal-green text-terminal-bg text-base font-semibold font-mono hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "$ ./apply --submit"}
            </button>
          </form>

          <div className="mt-8 p-4 rounded-lg bg-terminal-raised/40 border border-terminal-border/60">
            <p className="text-xs font-mono text-terminal-dim">
              <span className="text-terminal-yellow">!</span> Your data is transmitted securely. We never share your information.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}