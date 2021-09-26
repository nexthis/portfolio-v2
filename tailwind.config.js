const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},

    colors:{
      ...colors,
      primary: '#24262E',
      secondary: '#19202A',
      accent: '#00F7A2',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
