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
        }
      }
    }
  }
}
