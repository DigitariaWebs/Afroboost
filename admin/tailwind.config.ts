import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark jewel palette — matches the AfroBoost mobile app
        obsidian: {
          DEFAULT: "#0E1A14",
          950: "#0A130F",
          900: "#0E1A14",
          800: "#13241B",
          700: "#1A3127",
          600: "#234035",
        },
        emerald: {
          DEFAULT: "#1F8A55",
          light: "#2DBE76",
          dark: "#176B42",
        },
        gold: {
          DEFAULT: "#E5B040",
          light: "#F0C766",
          dark: "#C8942C",
        },
        plum: {
          DEFAULT: "#5B2A4F",
          light: "#7A3A6A",
        },
        ink: {
          DEFAULT: "#E8EFEA",
          muted: "#9DB0A5",
          faint: "#6B7E73",
        },
        line: "rgba(255,255,255,0.08)",
        "line-strong": "rgba(255,255,255,0.14)",
        success: "#2DBE76",
        warning: "#E5B040",
        danger: "#E5544B",
        info: "#4B9FE5",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(229,176,64,0.18), 0 8px 40px -12px rgba(31,138,85,0.35)",
        card: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -16px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "orb-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        "orb-pulse": "orb-pulse 3s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
