/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-dark': '#0f172a',
        'game-yellow': '#fde047',
        'game-blue': '#3b82f6',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'retro': ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
}
