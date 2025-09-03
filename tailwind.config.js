/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      oswald: "Oswald, sans-serif",
      urbanist: "Urbanist, sans-serif",
    },
    extend: {
      colors:{
        primary:"#900001",
      },
      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [],
};
