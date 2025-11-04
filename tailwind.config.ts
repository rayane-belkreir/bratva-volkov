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
        // Palette mafia vintage : noir charbon, gris acier, rouge sang, doré patiné
        "charcoal-black": "#0A0A0A", // Noir charbon
        "steel-gray": "#4A5568", // Gris acier
        "blood-red": "#8B0000", // Rouge sang
        "blood-red-light": "#A52A2A",
        "blood-red-dark": "#5C0000",
        "patina-gold": "#C9A961", // Doré patiné
        "patina-gold-light": "#E5C884",
        "patina-gold-dark": "#8B6F3D",
        "vintage-cream": "#F5F5DC", // Blanc cassé
        "anthracite": "#1A1A1A",
        "off-black": "#0D0D0D",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out",
        "slide-up": "slide-up 0.8s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "smoke-float": "smoke-float 6s ease-in-out infinite",
        "rain-drip": "rain-drip 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201, 169, 97, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(201, 169, 97, 0.6)" },
        },
        "smoke-float": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0.3" },
          "50%": { transform: "translateY(-20px) translateX(10px)", opacity: "0.5" },
          "100%": { transform: "translateY(0) translateX(0)", opacity: "0.3" },
        },
        "rain-drip": {
          "0%": { transform: "translateY(-10px)", opacity: "0.5" },
          "100%": { transform: "translateY(10px)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
