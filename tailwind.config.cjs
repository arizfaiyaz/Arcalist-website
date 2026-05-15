/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arca: {
          bg: "#080B14",
          section: "#0D1220",
          primary: "#7C3AED",
          secondary: "#06B6D4",
          highlight: "#A78BFA",
          text: "#F8FAFC",
          muted: "#94A3B8",
        },
      },
      boxShadow: {
        glow: "0 0 70px rgba(124, 58, 237, 0.32)",
        cyan: "0 0 54px rgba(6, 182, 212, 0.22)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
