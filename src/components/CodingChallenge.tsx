"use client";

import { useState, useEffect, useCallback } from "react";
import { katas, type Kata } from "@/data/katas";

type TestResult = {
  label: string;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
};

const STORAGE_KEY = "bf-kata-scores";

type Scores = Record<string, { best: number; solved: boolean }>;

function loadScores(): Scores {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveScores(scores: Scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // ignore
  }
}

const difficultyColor: Record<string, string> = {
  easy: "text-green-400 border-green-800/40 bg-green-950/20",
  medium: "text-yellow-400 border-yellow-800/40 bg-yellow-950/20",
  hard: "text-red-400 border-red-800/40 bg-red-950/20",
};

export default function CodingChallenge() {
  const [activeKata, setActiveKata] = useState<Kata>(katas[0]);
  const [code, setCode] = useState(katas[0].starterCode);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [allPassed, setAllPassed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [scores, setScores] = useState<Scores>({});
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const loaded = loadScores();
    setScores(loaded);
    const total = Object.values(loaded).reduce((s, v) => s + v.best, 0);
    setTotalScore(total);
  }, []);

  const switchKata = (kata: Kata) => {
    setActiveKata(kata);
    setCode(kata.starterCode);
    setResults(null);
    setAllPassed(false);
    setError(null);
    setShowHint(false);
  };

  const runTests = useCallback(() => {
    setError(null);
    setResults(null);
    setAllPassed(false);

    try {
      const fn = new Function(`"use strict"; return (${code})`)();
      if (typeof fn !== "function") {
        setError("Your code must export a function.");
        return;
      }

      const parsedInputs = activeKata.tests.map((t) => {
        try {
          return JSON.parse(t.input);
        } catch {
          return t.input;
        }
      });

      const testResults: TestResult[] = activeKata.tests.map((test, i) => {
        let actual: string;
        try {
          const result = fn(parsedInputs[i]);
          actual = JSON.stringify(result);
        } catch (e: any) {
          actual = `Error: ${e?.message || "runtime error"}`;
        }
        return {
          label: `test(${test.input})`,
          input: test.input,
          expected: test.expected,
          actual,
          passed: actual === test.expected,
        };
      });

      setResults(testResults);
      const passed = testResults.every((r) => r.passed);
      setAllPassed(passed);

      if (passed) {
        const points = activeKata.tests.length * 10;
        setScores((prev) => {
          const existing = prev[activeKata.id];
          const best = existing ? Math.max(existing.best, points) : points;
          const updated = { ...prev, [activeKata.id]: { best, solved: true } };
          saveScores(updated);
          setTotalScore(Object.values(updated).reduce((s, v) => s + v.best, 0));
          return updated;
        });
      }
    } catch (e: any) {
      setError(e?.message || "Syntax error. Check your code carefully.");
    }
  }, [code, activeKata]);

  const resetCode = () => {
    setCode(activeKata.starterCode);
    setResults(null);
    setAllPassed(false);
    setError(null);
    setShowHint(false);
  };

  const statusForKata = (kata: Kata) => {
    const s = scores[kata.id];
    if (s?.solved) return { label: "✓ solved", cls: "text-green-400" };
    return { label: `${kata.difficulty}`, cls: difficultyColor[kata.difficulty].split(" ")[0] };
  };

  return (
    <div className="rounded-xl border border-purple-900/30 bg-surface overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-purple-900/20 bg-surface/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="font-mono text-xs text-gray-400">challenges/</span>
          <span className="font-mono text-xs text-purple-300">{activeKata.id}</span>
          {totalScore > 0 && (
            <span className="text-[10px] font-mono text-yellow-500 border border-yellow-800/30 rounded px-1.5 py-0.5">
              {totalScore} pts
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-2.5 py-1 rounded text-[10px] font-mono text-gray-400 border border-purple-800/30 hover:bg-purple-950/30 transition-colors"
          >
            {showHint ? "hide hint" : "hint"}
          </button>
          <button
            onClick={resetCode}
            className="px-2.5 py-1 rounded text-[10px] font-mono text-gray-400 border border-purple-800/30 hover:bg-purple-950/30 transition-colors"
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

      {/* Kata selector tabs */}
      <div className="flex overflow-x-auto gap-1 px-5 py-2.5 border-b border-purple-900/20 bg-surface/30">
        {katas.map((kata) => {
          const st = statusForKata(kata);
          return (
            <button
              key={kata.id}
              onClick={() => switchKata(kata)}
              className={`flex-shrink-0 text-[10px] font-mono px-3 py-1.5 rounded transition-all ${
                activeKata.id === kata.id
                  ? "bg-purple-500/20 text-purple-300 border border-purple-600/30"
                  : "text-gray-500 border border-transparent hover:border-purple-800/30 hover:text-gray-300"
              }`}
            >
              {kata.title}
              <span className={`ml-1.5 ${st.cls}`}>{st.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hint banner */}
      {showHint && (
        <div className="px-5 py-2.5 bg-yellow-950/20 border-b border-yellow-800/20">
          <div className="flex items-start gap-2">
            <span className="text-yellow-500 font-mono text-[10px] mt-0.5">💡</span>
            <span className="text-[11px] font-mono text-yellow-300/80">
              {activeKata.hint}
            </span>
          </div>
        </div>
      )}

      {/* Editor + output split */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-purple-900/20">
        {/* Code editor */}
        <div className="relative">
          <div className="px-5 py-1.5 border-b border-purple-900/10 bg-surface/20">
            <span className="text-[10px] font-mono text-gray-600">
              {activeKata.id}.js
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setResults(null);
              setAllPassed(false);
            }}
            className="w-full h-56 p-4 bg-transparent text-sm font-mono text-gray-200 outline-none resize-none border-0 focus:ring-0 placeholder:text-gray-600"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <div className="absolute bottom-2 right-2 flex gap-3">
            <span className="text-[10px] font-mono text-gray-600">
              {code.split("\n").length} lines
            </span>
            <span className="text-[10px] font-mono text-gray-600">
              {code.length} chars
            </span>
          </div>
        </div>

        {/* Output */}
        <div className="p-4 bg-surface/30 min-h-[14rem]">
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="text-green-400">❯</span>
            <span>output</span>
            {allPassed && (
              <span className="text-green-400 text-[10px] bg-green-500/10 border border-green-800/30 rounded px-1.5 py-0.5 ml-auto">
                all {activeKata.tests.length} ✓
              </span>
            )}
          </div>

          {error && (
            <div className="text-red-400 text-xs font-mono mb-2 p-2 rounded bg-red-950/20 border border-red-800/20">
              <span className="text-red-500">✗</span> {error}
            </div>
          )}

          {results ? (
            <div className="space-y-1.5">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono px-2 py-1.5 rounded ${
                    r.passed
                      ? "text-green-400 bg-green-500/5"
                      : "text-red-400 bg-red-500/5"
                  }`}
                >
                  <span>{r.passed ? "✓" : "✗"}</span>{" "}
                  <span className="text-gray-500">test({r.label})</span>
                  <span className="text-gray-600"> → </span>
                  <span className={r.passed ? "text-green-300" : "text-red-300"}>
                    {r.actual}
                  </span>
                  {!r.passed && (
                    <div className="text-[10px] text-gray-500 mt-0.5 pl-4">
                      expected: <span className="text-yellow-300">{r.expected}</span>
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 pt-2 border-t border-purple-900/20 flex items-center gap-2">
                {allPassed ? (
                  <>
                    <span className="text-green-400 text-xs font-mono font-bold">
                      ✓ Challenge solved! +{activeKata.tests.length * 10} points
                    </span>
                    <span className="text-yellow-500 text-[10px] font-mono">
                      ★
                    </span>
                  </>
                ) : (
                  <span className="text-yellow-400 text-xs font-mono">
                    {results.filter((r) => r.passed).length}/{results.length} passed. Keep hacking.
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-xs font-mono text-gray-600 italic space-y-2">
              <div>{`// Click "run tests" to see results`}</div>
              <div className="text-[10px] text-gray-700">
                {activeKata.description}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Difficulty badge */}
      <div className="flex items-center justify-between px-5 py-2 border-t border-purple-900/10 bg-surface/20">
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${difficultyColor[activeKata.difficulty]}`}>
          {activeKata.difficulty.toUpperCase()}
        </span>
        <span className="text-[10px] font-mono text-gray-600">
          kata #{katas.indexOf(activeKata) + 1} of {katas.length}
        </span>
      </div>
    </div>
  );
}