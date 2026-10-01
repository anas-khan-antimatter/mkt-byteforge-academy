"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";

const DEFAULT_CODE = `// Byteforge Academy — Code Kata
// Write a function that returns the sum of two numbers.
// Then click "Run Checks" to validate your solution.

function add(a, b) {
  // your code here
  return a + b;
}
`;

export default function PlaygroundPage() {
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [result, setResult] = useState<{ passed: number; failed: number; tests: { name: string; passed: boolean; message: string }[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  async function runChecks() {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/kata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error — could not reach /api/kata");
    } finally {
      setLoading(false);
    }
  }

  function resetCode() {
    setCode(DEFAULT_CODE);
    setResult(null);
    setError(null);
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-terminal-bg text-terminal-text pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Terminal header */}
          <div
            className={`mb-8 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-raised/80 border border-terminal-border mb-4">
              <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
              <span className="ml-3 text-xs font-mono text-terminal-muted">
                bash — vi /playground/kata.ts
              </span>
            </div>
            <p className="text-xs font-mono text-terminal-green mb-2">
              $ node /playground/kata.js --check
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold text-terminal-text mb-2">
            Code Playground
          </h1>
          <p className="text-base text-terminal-muted max-w-2xl mb-8">
            Write your JavaScript solution, then run checks to validate against test cases.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Editor */}
            <div className="rounded-xl bg-terminal-raised/60 border border-terminal-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-terminal-raised/80 border-b border-terminal-border/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
                  <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
                  <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
                  <span className="ml-3 text-xs font-mono text-terminal-muted">kata.js</span>
                </div>
                <button
                  onClick={resetCode}
                  className="text-xs font-mono text-terminal-dim hover:text-terminal-orange transition-colors"
                >
                  $ reset
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[400px] p-5 bg-terminal-bg text-terminal-text font-mono text-sm leading-relaxed resize-none focus:outline-none border-0"
                spellCheck={false}
              />
            </div>

            {/* Results panel */}
            <div className="rounded-xl bg-terminal-raised/60 border border-terminal-border">
              <div className="flex items-center justify-between px-4 py-3 bg-terminal-raised/80 border-b border-terminal-border/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
                  <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
                  <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
                  <span className="ml-3 text-xs font-mono text-terminal-muted">output</span>
                </div>
              </div>

              <div className="p-5 min-h-[400px]">
                {/* Run button */}
                <div className="mb-6">
                  <button
                    onClick={runChecks}
                    disabled={loading}
                    className="w-full px-6 py-3 rounded-lg bg-terminal-green text-terminal-bg text-sm font-semibold font-mono hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Running checks..." : "▶ Run Checks"}
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="p-4 rounded-lg bg-terminal-red/10 border border-terminal-red/30 mb-4">
                    <p className="text-xs font-mono text-terminal-red">
                      $ stderr 2&gt;&amp;1
                    </p>
                    <p className="text-sm font-mono text-terminal-red mt-2">{error}</p>
                  </div>
                )}

                {/* Results */}
                {result && (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-mono text-terminal-green">
                        ✓ {result.passed} passed
                      </span>
                      <span className="text-xs font-mono text-terminal-red">
                        ✗ {result.failed} failed
                      </span>
                      <span className="text-xs font-mono text-terminal-dim">
                        | {result.passed + result.failed} total
                      </span>
                    </div>

                    {result.tests.map((test, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-3 rounded-lg mb-2 ${
                          test.passed
                            ? "bg-terminal-green/5 border border-terminal-green/20"
                            : "bg-terminal-red/5 border border-terminal-red/20"
                        }`}
                      >
                        <span className={`text-sm font-mono ${test.passed ? "text-terminal-green" : "text-terminal-red"}`}>
                          {test.passed ? "✓" : "✗"}
                        </span>
                        <div className="flex-1">
                          <p className={`text-xs font-mono ${test.passed ? "text-terminal-green" : "text-terminal-red"}`}>
                            {test.name}
                          </p>
                          {!test.passed && test.message && (
                            <p className="text-xs font-mono text-terminal-dim mt-1">
                              {test.message}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {!result && !error && (
                  <div className="text-center py-12">
                    <p className="text-xs font-mono text-terminal-dim">
                      <span className="text-terminal-green">$</span> await run_checks()
                    </p>
                    <p className="text-sm font-mono text-terminal-muted mt-3">
                      Write your solution and click "Run Checks" to validate.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hint */}
          <div className="mt-10 p-5 rounded-xl bg-terminal-raised/40 border border-terminal-border/60">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-terminal-yellow">!</span>
              <span className="text-xs font-mono text-terminal-muted font-semibold">Hint</span>
            </div>
            <p className="text-xs font-mono text-terminal-dim">
              The kata expects a function named <span className="text-terminal-cyan">add</span> that takes two arguments and returns their sum.
              Your code is evaluated on the server with test assertions.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}