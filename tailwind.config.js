/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  variants: {
    extend: {},
  },
  theme:{
    extend:{
      colors:{
        primary: {
          50: "#E8E9ED",
          100: "#CED0D9",
          200: "#9EA2B3",
          300: "#70768F",
          400: "#4A4E5E",
          500: "#24262E",
          600: "#1D1F25",
          700: "#16181D",
          800: "#0D0E11",
          900: "#070709",
          DEFAULT: "#24262E",
        },
        secondary: {
          50: "#E2E7EE",
          100: "#C9D2DF",
          200: "#8FA2BC",
          300: "#5B7599",
          400: "#394960",
          500: "#19202A",
          600: "#131820",
          700: "#0F141A",
          800: "#0A0C10",
          900: "#06070A",
          DEFAULT: "#19202A",
        },
        accent: {
          50: "#E5FFF6",
          100: "#CCFFED",
          200: "#94FFDA",
          300: "#61FFC8",
          400: "#2EFFB6",
          500: "#00F7A2",
          600: "#00C781",
          700: "#009460",
          800: "#00613F",
          900: "#003321",
          DEFAULT: "#00C781",
        }
      }
    }
  },
  plugins: [],
};
