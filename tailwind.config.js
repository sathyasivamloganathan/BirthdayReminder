/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light Theme
        primaryLight: "#F0635A",
        secondaryLight: "#F9C26B",
        accentLight: "#B389D4",
        successLight: "#4BA79A",
        textLight: "#344B64",
        bgLight: "#fafaef",

        // Dark Theme
        primaryDark: "#F26D65",
        secondaryDark: "#F9C683",
        accentDark: "#BB8ADF",
        successDark: "#56B3A7",
        textDark: "#ccd5e0",
        bgDark: "#1C1C1E",

        
      },
      screens: {
        "only-sm": { min: "640px", max: "767px" },
      },
    },
  },
  plugins: [],
};
