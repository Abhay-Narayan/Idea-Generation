/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // Add custom font here
      },
      colors: {
        main: "#7c4ee4",
        surface: "#cbbfe5",
        hovermain: "#9e7ce8",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
