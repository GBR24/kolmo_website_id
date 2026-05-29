/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070b12",
        inkSoft: "#0e141d",
        textPrimary: "#d6e2f0",
        textSecondary: "#7c8a9a",
        line: "rgba(77, 163, 255, 0.28)",
        cyanSoft: "rgba(77, 163, 255, 0.14)",
      },
      boxShadow: {
        panel: "0 24px 70px rgba(0, 0, 0, 0.28)",
        insetline: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(77, 163, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(210, 153, 34, 0.035) 1px, transparent 1px)",
        vignette:
          "radial-gradient(circle at top, rgba(77, 163, 255, 0.18), transparent 27%), radial-gradient(circle at 80% 18%, rgba(210, 153, 34, 0.11), transparent 20%)",
      },
      animation: {
        drift: "drift 12s linear infinite",
        pulseSoft: "pulseSoft 5s ease-in-out infinite",
        floatLabel: "floatLabel 8s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translate3d(180px, -120px, 0)", opacity: "0" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.72" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
        },
        floatLabel: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
};
