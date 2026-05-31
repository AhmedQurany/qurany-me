import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-elevated": "rgb(var(--surface-elevated) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "text-tertiary": "rgb(var(--text-tertiary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        archetype: {
          magician: "#FF6B9D",
          architect: "#00F0FF",
          navigator: "#00C896",
          strategist: "#FF3D33",
          storyteller: "#FFB800",
          builder: "#7B5EFF",
        },
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        arabic: ["var(--font-noto-kufi-arabic)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(40px, 5.5vw, 88px)",
          { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        "display-lg": [
          "clamp(36px, 4vw, 64px)",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "800" },
        ],
        "display-md": [
          "clamp(28px, 3vw, 44px)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "body-lg": ["19px", { lineHeight: "1.55" }],
        "body-md": ["17px", { lineHeight: "1.55" }],
        "body-sm": ["15px", { lineHeight: "1.55" }],
        label: ["12px", { lineHeight: "1.4", letterSpacing: "0.2em", fontWeight: "500" }],
        "label-sm": ["11px", { lineHeight: "1.4", letterSpacing: "0.25em", fontWeight: "500" }],
      },
      spacing: {
        section: "128px",
        "section-mobile": "80px",
        container: "32px",
        "container-mobile": "20px",
      },
      maxWidth: {
        container: "1440px",
      },
      borderRadius: {
        none: "0",
        xs: "2px",
        sm: "4px",
        md: "6px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
        tight: "-0.02em",
        mono: "0.15em",
        "mono-wide": "0.2em",
        "mono-wider": "0.25em",
      },
      animation: {
        "float-1": "float 6s ease-in-out infinite",
        "float-2": "float 6.2s ease-in-out infinite 0.4s",
        "float-3": "float 6.4s ease-in-out infinite 0.8s",
        "float-4": "float 6.6s ease-in-out infinite 1.2s",
        "float-5": "float 6.8s ease-in-out infinite 1.6s",
        "float-6": "float 7s ease-in-out infinite 2s",
        "pulse-dot": "pulseDot 1.6s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        progress: "progress 5s linear forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--rot, 0deg))" },
          "50%": { transform: "translateY(-8px) rotate(var(--rot, 0deg))" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.4)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
