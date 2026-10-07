import type { Config } from "tailwindcss";

// Tokens from the "Qurany Glass website" Figma file.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: "#3A1015",
        red: "#BF4447",
        card: "#161616",
        grey: {
          100: "#F9FAFB",
          200: "#F4F6F8",
          400: "#C4CDD5",
          500: "#919EAB",
          600: "#637381",
          900: "#161C24",
        },
      },
      fontFamily: {
        sans: ["Lufga", "var(--font-fallback)", "system-ui", "sans-serif"],
        syne: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Figma sizes, fluid below desktop.
        hero: ["clamp(40px, 4.4vw, 64px)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        h2: ["clamp(30px, 3vw, 44px)", { lineHeight: "1.2" }],
        kicker: ["clamp(26px, 3vw, 44px)", { lineHeight: "1.3" }],
        lead: ["clamp(17px, 1.3vw, 20px)", { lineHeight: "1.3" }],
      },
      maxWidth: {
        page: "1264px",
      },
      borderRadius: {
        pill: "80px",
      },
    },
  },
  plugins: [],
};

export default config;
