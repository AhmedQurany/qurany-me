import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        sheet: "rgb(var(--sheet) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        clay: "rgb(var(--clay) / <alpha-value>)",
        "clay-soft": "rgb(var(--clay-soft) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(40px, 6.4vw, 96px)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        h2: ["clamp(32px, 4.2vw, 60px)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        h3: ["clamp(22px, 2vw, 28px)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        lead: ["clamp(18px, 1.5vw, 21px)", { lineHeight: "1.5" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.16em" }],
      },
      maxWidth: {
        page: "1320px",
      },
    },
  },
  plugins: [],
};

export default config;
