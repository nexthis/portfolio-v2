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
          50: '#787878',
          100: '#6D6D6D',
          200: '#565656',
          300: '#3F3F3F',
          400: '#282828',
          500: '#111111',
          600: '#0C0C0C',
          700: '#070707',
          800: '#020202',
          900: '#000000',
          DEFAULT: '#111111',
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
          DEFAULT: '#673AB7',
          50: '#CEBEEA',
          100: '#C2AFE6',
          200: '#AB90DC',
          300: '#9471D2',
          400: '#7C52C8',
          500: '#673AB7',
          600: '#4F2C8C',
          700: '#371F62',
          800: '#1F1137',
          900: '#07040D'
        }
      }
    }
  },
  plugins: [],
};
