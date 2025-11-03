import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          DEFAULT: "#C1A35F",
          light: "#D4B87A",
          dark: "#9E8A4F",
        },
        burgundy: {
          DEFAULT: "#3A0D12",
          light: "#4D151C",
          dark: "#2A0A0D",
        },
        anthracite: "#121212",
        "off-black": "#0B0B0B",
        "cream-white": "#EDE8D5",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "tracking-in": "tracking-in 1s ease-out",
        "fade-up": "fade-up 0.8s ease-out",
        "magnetic-hover": "magnetic-hover 0.3s ease-out",
        "glare-sweep": "glare-sweep 2s ease-in-out infinite",
      },
      keyframes: {
        "tracking-in": {
          "0%": {
            letterSpacing: "0.5em",
            opacity: "0",
          },
          "100%": {
            letterSpacing: "normal",
            opacity: "1",
          },
        },
        "fade-up": {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "magnetic-hover": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(2px, -2px)" },
        },
        "glare-sweep": {
          "0%": { transform: "translateX(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(200%) rotate(45deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

