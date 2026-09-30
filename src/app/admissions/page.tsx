"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

type Step = "program" | "info" | "background" | "review";

const programOptions = [
  { id: "se", label: "Software Engineering", duration: "16 weeks" },
  { id: "ds", label: "Data Science & AI", duration: "14 weeks" },
  { id: "sys", label: "Systems & Infrastructure", duration: "12 weeks" },
];

const experienceOptions = [
  { id: "none", label: "No coding experience" },
  { id: "some", label: "Some self-taught (HTML/CSS/JS basics)" },
  { id: "intermediate", label: "Intermediate (built a few projects)" },
  { id: "advanced", label: "Advanced (can build full-stack apps)" },
];

export default function AdmissionsPage() {
  const [step, setStep] = useState<Step>("program");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    background: "",
    referral: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceedInfo = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim().includes("@") &&
      formData.phone.trim().length >= 7
    );
  };

  const canProceedBackground = () => {
    return formData.experience && formData.background.trim().length >= 10;
  };

  const handleSubmit = () => {
    setError("");
    if (!selectedProgram || !canProceedInfo() || !canProceedBackground()) {
      setError("Please complete all required fields.");
      return;
    }
    setSubmitted(true);
  };

  const progress = {
    program: 1,
    info: 2,
    background: 3,
    review: 4,
  };

  const totalSteps = 4;

  if (submitted) {
    return (
      <>
        <Nav />
        <main className="min-h-screen bg-surface pt-24 pb-20 flex items-center">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-950/30 border border-green-800/30 font-mono text-xs text-green-400 mb-8">
              <span>●</span>
              Application received
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Application <span className="text-gradient">submitted</span>
            </h1>
            <p className="text-sm font-mono text-gray-400 mb-6">
              Thanks, {formData.firstName}! We&apos;ve sent a confirmation to{" "}
              <span className="text-cyan-400">{formData.email}</span>.
              Our admissions team will review your application within 5 business days.
            </p>
            <div className="inline-block p-5 rounded-xl bg-surface border border-purple-900/30">
              <div className="font-mono text-[10px] text-gray-500 mb-1">Confirmation</div>
              <div className="font-mono text-xs text-gray-300">
                <span className="text-cyan-400">#</span>BF-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 9000) + 1000)}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-surface pt-24 pb-20">
        {/* Hero */}
        <section className="relative border-b border-purple-900/20 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="inline-block px-3 py-1 rounded bg-purple-950/50 border border-purple-800/40 text-purple-300 text-[10px] font-mono uppercase tracking-wider mb-4">
              ADMISSIONS
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Apply to <span className="text-gradient">Byteforge</span>
            </h1>
            <p className="text-sm text-gray-400 font-mono max-w-2xl">
              No upfront tuition. No degree required. Just a drive to build.
              Complete this application and our team will reach out within 5 days.
            </p>
          </div>
        </section>

        {/* Application form */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-gray-500">
                Step {progress[step]} of {totalSteps}
              </span>
              <span className="text-[10px] font-mono text-purple-400">
                {Math.round((progress[step] / totalSteps) * 100)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-light border border-purple-900/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${(progress[step] / totalSteps) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {(["program", "info", "background", "review"] as Step[]).map((s, i) => (
                <button
                  key={s}
                  onClick={() => {
                    // Only allow going back, or forward through completed steps
                    const idx = ["program", "info", "background", "review"].indexOf(step);
                    if (i < idx) setStep(s);
                  }}
                  className={`text-[9px] font-mono uppercase tracking-wider ${
                    s === step
                      ? "text-purple-300"
                      : i < ["program", "info", "background", "review"].indexOf(step)
                      ? "text-cyan-400 hover:text-cyan-300 cursor-pointer"
                      : "text-gray-600 cursor-default"
                  }`}
                >
                  {s === "program" ? "Program" : s === "info" ? "Info" : s === "background" ? "Background" : "Review"}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-950/30 border border-red-800/30 text-xs font-mono text-red-400">
              ✗ {error}
            </div>
          )}

          {/* Step: Program Selection */}
          {step === "program" && (
            <div className="space-y-4">
              <div className="text-sm font-mono text-gray-400 mb-4">
                Select the program you&apos;d like to apply for:
              </div>
              {programOptions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProgram(p.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                    selectedProgram === p.id
                      ? "border-purple-500/50 bg-purple-950/20 shadow-lg shadow-purple-500/5"
                      : "border-purple-900/30 bg-surface hover:border-purple-700/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{p.label}</div>
                      <div className="text-[10px] font-mono text-gray-500 mt-1">{p.duration}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedProgram === p.id
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-gray-600"
                      }`}
                    >
                      {selectedProgram === p.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      )}
                    </div>
                  </div>
                </button>
              ))}

              <div className="pt-6">
                <button
                  onClick={() => selectedProgram && setStep("info")}
                  disabled={!selectedProgram}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-all font-mono"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step: Personal Info */}
          {step === "info" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Jane"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-800/30 rounded-lg text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-800/30 rounded-lg text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/30 rounded-lg text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/30 rounded-lg text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              <div className="pt-6 flex gap-3">
                <button
                  onClick={() => setStep("program")}
                  className="px-6 py-3 rounded-lg border border-purple-700/50 text-gray-300 text-sm font-mono hover:bg-purple-950/30 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={() => canProceedInfo() && setStep("background")}
                  disabled={!canProceedInfo()}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-all font-mono"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step: Background */}
          {step === "background" && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                  Coding Experience *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {experienceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => updateField("experience", opt.id)}
                      className={`text-left p-3 rounded-lg border text-xs font-mono transition-all ${
                        formData.experience === opt.id
                          ? "border-purple-500/50 bg-purple-950/20 text-purple-200"
                          : "border-purple-900/20 bg-surface text-gray-400 hover:border-purple-700/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                  Why do you want to join Byteforge? *
                </label>
                <textarea
                  value={formData.background}
                  onChange={(e) => updateField("background", e.target.value)}
                  placeholder="Tell us your story — what drives you to build, and why Byteforge?"
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/30 rounded-lg text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-1.5 uppercase tracking-wider">
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  value={formData.referral}
                  onChange={(e) => updateField("referral", e.target.value)}
                  placeholder="Twitter / friend / ad / other"
                  className="w-full px-4 py-3 bg-black/50 border border-purple-800/30 rounded-lg text-sm font-mono text-white placeholder:text-gray-600 outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              <div className="pt-6 flex gap-3">
                <button
                  onClick={() => setStep("info")}
                  className="px-6 py-3 rounded-lg border border-purple-700/50 text-gray-300 text-sm font-mono hover:bg-purple-950/30 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={() => canProceedBackground() && setStep("review")}
                  disabled={!canProceedBackground()}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-all font-mono"
                >
                  Review →
                </button>
              </div>
            </div>
          )}

          {/* Step: Review */}
          {step === "review" && (
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                Application Summary
              </div>

              <div className="p-5 rounded-xl bg-surface border border-purple-900/30 space-y-4">
                <div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Program</div>
                  <div className="text-sm font-mono text-white mt-1">
                    {programOptions.find((p) => p.id === selectedProgram)?.label}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase">Name</div>
                    <div className="text-sm font-mono text-white mt-1">
                      {formData.firstName} {formData.lastName}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase">Email</div>
                    <div className="text-sm font-mono text-white mt-1">{formData.email}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase">Phone</div>
                    <div className="text-sm font-mono text-white mt-1">{formData.phone}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase">Experience</div>
                    <div className="text-sm font-mono text-white mt-1">
                      {experienceOptions.find((e) => e.id === formData.experience)?.label}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Statement</div>
                  <div className="text-xs font-mono text-gray-300 mt-1 leading-relaxed">
                    &ldquo;{formData.background}&rdquo;
                  </div>
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <button
                  onClick={() => setStep("background")}
                  className="px-6 py-3 rounded-lg border border-purple-700/50 text-gray-300 text-sm font-mono hover:bg-purple-950/30 transition-all"
                >
                  ← Edit
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-all font-mono"
                >
                  $ submit_application
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}