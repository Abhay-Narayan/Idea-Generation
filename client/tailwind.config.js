/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Add custom font here
      },
      colors:{
        main:'#7C4EE4'
      }
    },
  },
  plugins: [],
}