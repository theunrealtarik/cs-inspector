/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        default: "#ffffff",
        success: "#2ecc71",
        info: "#7289da",
        error: "#f04747",
        warning: "#f1c40f",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@vechaiui/core")],
};
