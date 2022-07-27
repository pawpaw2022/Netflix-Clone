/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
