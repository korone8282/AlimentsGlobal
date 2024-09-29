/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../public/images/123.jpeg')",
        'zero': "url('../public/images/dark.png')",
        'a': "url('../public/images/kk.jpg')",
        'b': "url('../public/images/ngng.jpg')",
        'c': "url('../public/images/yoyo.jpg')",
      },
    },
  },
  plugins: [],
}