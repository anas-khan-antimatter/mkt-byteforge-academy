"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";

export default function FailPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-terminal-bg text-terminal-text pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`mb-8 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-raised/80 border border-terminal-border mb-4 w-fit mx-auto">
              <span className="w-3 h-3 rounded-full bg-terminal-red/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-orange/60" />
              <span className="w-3 h-3 rounded-full bg-terminal-green/60" />
              <span className="ml-3 text-xs font-mono text-terminal-muted">bash — ./fail --simulate</span>
            </div>
            <p className="text-xs font-mono text-terminal-red mb-4">
              $ ./fail --simulate 2&gt;&amp;1
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-terminal-text mb-4">
              Failure is a Feature
            </h1>

            <div className="p-8 rounded-xl bg-terminal-raised/60 border border-terminal-border/60 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-terminal-red" />
                <span className="text-xs font-mono text-terminal-red font-bold">
                  SIMULATED FAILURE
                </span>
              </div>
              <p className="text-xs font-mono text-terminal-dim leading-relaxed text-left">
                [ERROR] Segmentation fault (core dumped)<br />
                [ERROR] Unhandled promise rejection: ReferenceError: x is not defined<br />
                [WARN] 4 test(s) failed — expected 6 to equal 42<br />
                [INFO] This is a simulated failure page. Nothing is actually broken.
              </p>
            </div>

            <p className="text-sm font-mono text-terminal-muted leading-relaxed mb-6">
              At Byteforge, we teach you to embrace failure. Every error message is a clue.
              Every crash is a learning opportunity. Our curriculum includes dedicated modules
              on debugging, error handling, and building resilient systems.
            </p>

            <p className="text-xs font-mono text-terminal-dim mb-8">
              <span className="text-terminal-green">$</span> echo &quot;fail early, fail often, fail forward&quot;
            </p>

            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-green transition-all"
            >
              <span className="font-mono text-xs text-terminal-green">$</span> cd /home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}