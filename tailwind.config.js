/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'lg': '30px',
      },
      colors: {
        'green-ligth': '#37D493'
      }
    }
   
  },
  plugins: [],
}
