import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'utils/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    'app.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edfff8',
          100: '#d5fff0',
          200: '#aeffe1',
          300: '#70ffcb',
          400: '#2bfdaf',
          500: '#00da89',
          600: '#00c074',
          700: '#00965e',
          800: '#06754d',
          900: '#076041',
          950: '#003723',
          DEFAULT: '#00da89'
        },
        background: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#141414',
          DEFAULT: '#141414'
        }
      }
    }
  }
}
