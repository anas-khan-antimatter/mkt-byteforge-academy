"use client";

import { useState, useRef, useEffect } from "react";

const KATA = {
  title: "Reverse a String",
  description: `Write a function \`reverse(str)\` that returns the reversed version of the input string.`,
  starterCode: `function reverse(str) {\n  // Your code here\n  return str;\n}`,
  tests: [
    { input: "hello", expected: "olleh" },
    { input: "Byteforge", expected: "egrofetyB" },
    { input: "racecar", expected: "racecar" },
    { input: "a", expected: "a" },
    { input: "", expected: "" },
  ],
};

type TestResult = {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
};

export default function CodingChallenge() {
  const [code, setCode] = useState(KATA.starterCode);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [allPassed, setAllPassed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runTests = () => {
    setError(null);
    setResults(null);
    setAllPassed(false);

    try {
      // Create a safe eval — wrap in function to get strict-ish scope
      const fn = new Function(`"use strict"; return (${code})`)();
      if (typeof fn !== "function") {
        setError("Your code must return a function.");
        return;
      }

      const testResults: TestResult[] = KATA.tests.map((test) => {
        const actual = String(fn(test.input));
        return {
          input: JSON.stringify(test.input),
          expected: JSON.stringify(test.expected),
          actual,
          passed: actual === JSON.stringify(test.expected),
        };
      });

      setResults(testResults);
      setAllPassed(testResults.every((r) => r.passed));
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Check your syntax.");
    }
  };

  const resetCode = () => {
    setCode(KATA.starterCode);
    setResults(null);
    setAllPassed(false);
    setError(null);
  };

  return (
    <div className="rounded-xl border border-purple-900/30 bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-purple-900/20 bg-surface/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="font-mono text-xs text-gray-400">challenge.ts — {KATA.title}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetCode}
            className="px-3 py-1.5 rounded text-xs font-mono text-gray-400 border border-purple-800/30 hover:bg-purple-950/30 hover:text-gray-200 transition-colors"
          >
            reset
          </button>
          <button
            onClick={runTests}
            className="px-4 py-1.5 rounded text-xs font-mono text-black font-semibold bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-400 hover:to-cyan-300 transition-all"
          >
            $ run tests
          </button>
        </div>
      </div>

      {/* Editor + output split */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-purple-900/20">
        {/* Code editor */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-52 p-4 bg-transparent text-sm font-mono text-gray-200 outline-none resize-none border-0 focus:ring-0 placeholder:text-gray-600"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <div className="absolute bottom-2 right-2">
            <span className="text-[10px] font-mono text-gray-600">
              {code.split("\n").length} lines
            </span>
          </div>
        </div>

        {/* Output */}
        <div className="p-4 bg-surface/30 min-h-[13rem]">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="text-green-400">❯</span>
            <span>output</span>
          </div>

          {error && (
            <div className="text-red-400 text-xs font-mono mb-2">
              <span className="text-red-500">✗</span> {error}
            </div>
          )}

          {results ? (
            <div className="space-y-1.5">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono px-2 py-1 rounded ${
                    r.passed
                      ? "text-green-400 bg-green-500/5"
                      : "text-red-400 bg-red-500/5"
                  }`}
                >
                  <span>{r.passed ? "✓" : "✗"}</span>{" "}
                  <span className="text-gray-500">reverse</span>(
                  <span className="text-yellow-300">{r.input}</span>)
                  <span className="text-gray-600"> → </span>
                  <span className={r.passed ? "text-green-300" : "text-red-300"}>
                    {r.actual}
                  </span>
                  {!r.passed && (
                    <span className="text-gray-500">
                      {" "}
                      (expected {r.expected})
                    </span>
                  )}
                </div>
              ))}
              <div className="mt-3 pt-2 border-t border-purple-900/20 flex items-center gap-2">
                {allPassed ? (
                  <span className="text-green-400 text-xs font-mono font-bold">
                    ✓ All {results.length} tests passed. You ship.
                  </span>
                ) : (
                  <span className="text-yellow-400 text-xs font-mono">
                    {results.filter((r) => r.passed).length}/{results.length} passed. Keep hacking.
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-xs font-mono text-gray-600 italic">
              {`// Click "run tests" to see results`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}