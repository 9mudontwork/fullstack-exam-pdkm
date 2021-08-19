const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  corePlugins: {
    preflight: false,
  },
  purge: {
    content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}', './layouts/**/*.{html,js}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ...colors,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
