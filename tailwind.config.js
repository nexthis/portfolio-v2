module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily:{
      'display': ['Staatliches', 'cursive'],
      'body': ['Lato', 'sans-serif'],
    },
    colors:{
      primary: '#24262E',
      secondary: '#1F1F1F',
      accent: '#52F2C8',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
