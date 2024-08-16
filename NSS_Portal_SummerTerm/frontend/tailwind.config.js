/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '303983',
      },
      height: {
        '100': '25rem',
        '120': '30rem'
      }
    },
  },
  plugins: [],
}

