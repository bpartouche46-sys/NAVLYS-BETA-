/** tailwind.config.js — copie rapatriée du Drive « navlys juin vrac md » le 2026-06-25 (référence).
 *  @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charte NAVLYS verrouillée (CLAUDE.md)
        bronze: { DEFAULT: "#B87333", deep: "#8B5A26", light: "#D89A55" },
        gold: { DEFAULT: "#C9A961", light: "#E2C794" },
        ice: { DEFAULT: "#7DD3FC", deep: "#38BDF8" },
        night: { DEFAULT: "#02040a", soft: "#0A0F1E" },
        pearl: { DEFAULT: "#F2F4F7", soft: "#E9ECF2" },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "navlys-radial":
          "radial-gradient(ellipse at top, #0A0F1E 0%, #02040a 60%)",
      },
      animation: {
        "ice-pulse": "icePulse 2.4s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out both",
      },
      keyframes: {
        icePulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(125,211,252,0.6)" },
          "50%": { boxShadow: "0 0 24px 6px rgba(125,211,252,0.15)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
