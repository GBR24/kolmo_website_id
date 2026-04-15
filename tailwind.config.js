/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050b11",
        inkSoft: "#08131d",
        textPrimary: "#edf3f8",
        textSecondary: "#97acbd",
        line: "rgba(72, 142, 177, 0.28)",
        cyanSoft: "rgba(107, 178, 206, 0.12)",
      },
      boxShadow: {
        panel: "0 24px 70px rgba(0, 0, 0, 0.28)",
        insetline: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(123, 147, 164, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 147, 164, 0.06) 1px, transparent 1px)",
        vignette:
          "radial-gradient(circle at top, rgba(63, 102, 128, 0.18), transparent 24%), radial-gradient(circle at 78% 20%, rgba(117, 146, 171, 0.08), transparent 18%)",
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
