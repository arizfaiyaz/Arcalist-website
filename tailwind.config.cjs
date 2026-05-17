/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arca: {
          bg: "#FFF5E4",
          section: "#FFE3E1",
          panel: "#FCF7F0",
          primary: "#FF9494",
          secondary: "#FFD1D1",
          highlight: "#FFE3E1",
          text: "#2A2522",
          muted: "#5B514B",
          anchor: "#6B5F59",
          accent: "#B84E4E",
        },
      },
      boxShadow: {
        glow: "0 24px 70px rgba(255, 148, 148, 0.28)",
        cyan: "0 18px 54px rgba(184, 78, 78, 0.16)",
        card: "0 18px 42px rgba(88, 61, 50, 0.10), 0 3px 12px rgba(255, 148, 148, 0.12)",
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
