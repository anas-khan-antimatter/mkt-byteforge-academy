"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";

export default function OutcomesPage() {
  const [mounted, setMounted] = useState(false);
  const [preSalary, setPreSalary] = useState(42000);
  const [result, setResult] = useState<{ pre: number; post: number; gain: number; gainPercent: number } | null>(null);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const SALARY_BANDS = [
    { min: 0, label: "Under $25k", multiplier: 3.1 },
    { min: 25000, label: "$25k – $40k", multiplier: 2.4 },
    { min: 40000, label: "$40k – $55k", multiplier: 1.9 },
    { min: 55000, label: "$55k – $70k", multiplier: 1.5 },
    { min: 70000, label: "$70k – $85k", multiplier: 1.2 },
    { min: 85000, label: "$85k+", multiplier: 1.0 },
  ];

  function calculate() {
    let band = SALARY_BANDS[0];
    for (const b of SALARY_BANDS) {
      if (preSalary >= b.min) band = b;
    }
    const post = Math.round(preSalary * band.multiplier);
    const gain = post - preSalary;
    const gainPercent = Math.round((gain / preSalary) * 100);
    setResult({ pre: preSalary, post, gain, gainPercent });
    setCalculated(true);
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-terminal-bg text-terminal-text pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Terminal header */}
          <div
            className={`mb-8 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-raised/80 border border-terminal-border mb-4">
              <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
              <span className="ml-3 text-xs font-mono text-terminal-muted">
                bash — ./salary-calculator --interactive
              </span>
            </div>
            <p className="text-xs font-mono text-terminal-green mb-2">
              $ cat /outcomes/salary-calculator.ts
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-bold text-terminal-text mb-2">
            Salary Calculator
          </h1>
          <p className="text-base text-terminal-muted max-w-2xl mb-8">
            See how Byteforge Academy can impact your earning potential. Enter your current salary
            to estimate your post-graduation salary.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input panel */}
            <div className="rounded-xl p-6 bg-terminal-raised/60 border border-terminal-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                <span className="text-xs font-mono text-terminal-cyan">INPUT</span>
              </div>

              <label className="block text-xs font-mono text-terminal-dim mb-3">
                $ read --prompt=&quot;current annual salary ($): &quot;
              </label>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm font-mono text-terminal-green">$</span>
                <input
                  type="range"
                  min={0}
                  max={150000}
                  step={5000}
                  value={preSalary}
                  onChange={(e) => { setPreSalary(Number(e.target.value)); setCalculated(false); }}
                  className="w-full accent-terminal-green"
                />
                <span className="text-sm font-mono text-terminal-muted">${(preSalary / 1000).toFixed(0)}k</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {SALARY_BANDS.map((band) => (
                  <button
                    key={band.min}
                    onClick={() => { setPreSalary(band.min + (band.min === 0 ? 15000 : band.min >= 85000 ? 100000 : 10000)); setCalculated(false); }}
                    className="px-3 py-1.5 rounded text-xs font-mono text-terminal-dim border border-terminal-border/50 hover:border-terminal-green/50 hover:text-terminal-green transition-all"
                  >
                    {band.label}
                  </button>
                ))}
              </div>

              <button
                onClick={calculate}
                className="w-full px-6 py-3 rounded-lg bg-terminal-green text-terminal-bg text-sm font-semibold font-mono hover:scale-[1.02] transition-all"
              >
                $ ./calculate --run
              </button>
            </div>

            {/* Results panel */}
            <div className="rounded-xl p-6 bg-terminal-raised/60 border border-terminal-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                <span className="text-xs font-mono text-terminal-cyan">OUTPUT</span>
              </div>

              {calculated && result ? (
                <div className="space-y-6">
                  {/* Pre */}
                  <div className="p-5 rounded-lg bg-terminal-raised/40 border border-terminal-border/60">
                    <p className="text-xs font-mono text-terminal-dim mb-1">
                      $ cat /outcomes/salary-before.txt
                    </p>
                    <p className="text-3xl font-display font-bold text-terminal-text">
                      ${result.pre.toLocaleString()}
                    </p>
                    <p className="text-xs font-mono text-terminal-dim">Current salary (pre)</p>
                  </div>

                  {/* Arrow */}
                  <div className="text-center py-2">
                    <span className="text-2xl text-terminal-green">▼</span>
                  </div>

                  {/* Post */}
                  <div className="p-5 rounded-lg bg-terminal-green/10 border border-terminal-green/30">
                    <p className="text-xs font-mono text-terminal-dim mb-1">
                      $ cat /outcomes/salary-after.txt
                    </p>
                    <p className="text-3xl font-display font-bold text-terminal-green">
                      ${result.post.toLocaleString()}
                    </p>
                    <p className="text-xs font-mono text-terminal-dim">Estimated salary (post)</p>
                  </div>

                  {/* Gain */}
                  <div className="p-4 rounded-lg bg-terminal-raised/40 border border-terminal-border/60">
                    <p className="text-xs font-mono text-terminal-dim mb-1">
                      $ ./calculate --report
                    </p>
                    <p className="text-lg font-display font-semibold text-terminal-text">
                      +${result.gain.toLocaleString()}
                      <span className="text-terminal-green ml-2">({result.gainPercent}% increase)</span>
                    </p>
                    {result.gainPercent >= 100 && (
                      <p className="text-xs font-mono text-terminal-green mt-2">
                        ⚡ You could more than double your salary!
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xs font-mono text-terminal-dim mb-4">
                    <span className="text-terminal-green">$</span> await calculate()
                  </p>
                  <p className="text-sm font-mono text-terminal-muted">
                    Set your current salary and click calculate to see the estimate.
                  </p>
                  <p className="text-xs font-mono text-terminal-dim mt-4">
                    Based on 600+ graduate placements with average $82k starting salary.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 p-5 rounded-xl bg-terminal-raised/40 border border-terminal-border/60">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-terminal-yellow">!</span>
              <span className="text-xs font-mono text-terminal-muted font-semibold">Disclaimer</span>
            </div>
            <p className="text-xs font-mono text-terminal-dim">
              This calculator provides estimates based on aggregate outcomes data from our graduates.
              Individual results vary based on location, market conditions, effort, and other factors.
              Not a guarantee of any specific salary.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}