import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#0a0e14",
          surface: "#111827",
          raised: "#1a2333",
          border: "#1e293b",
          text: "#e4e4e7",
          muted: "#94a3b8",
          dim: "#475569",
          green: "#4ade80",
          cyan: "#22d3ee",
          orange: "#f97316",
          red: "#ef4444",
          pink: "#ec4899",
          yellow: "#eab308",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      boxShadow: {
        "terminal": "0 0 0 1px #1e293b, 0 4px 24px rgba(0,0,0,0.6)",
        "glow-green": "0 0 20px rgba(74,222,128,0.15)",
        "glow-cyan": "0 0 20px rgba(34,211,238,0.15)",
      },
      animation: {
        "cursor-blink": "blink 1s step-end infinite",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-green": "pulseGreen 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGreen: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(74,222,128,0.08)" },
          "50%": { boxShadow: "0 0 24px rgba(74,222,128,0.25)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;