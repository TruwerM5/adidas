/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'gray': '#d3d7da',
        'gray-dark': '#767677'
      },
      fontFamily: {
        'adihaus': ['Adihaus'],
        'adihaus-cn': ['AdihausCn'],
        'adineue': ['adineue']
      },
      screens: {
        '3xl': '1920px'
      }
    },
  },
  plugins: [],
}
