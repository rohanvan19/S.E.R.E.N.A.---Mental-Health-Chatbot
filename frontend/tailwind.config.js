/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        calmBlue: '#A7C7E7',
        calmGreen: '#B7E7A7',
        calmPurple: '#C7A7E7',
        calmPink: '#E7A7C7',
        calmGray: '#F5F6FA',
        accent: '#6C63FF',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

