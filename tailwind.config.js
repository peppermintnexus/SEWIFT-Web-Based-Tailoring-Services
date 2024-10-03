/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sewift-gray': '#6f6f6f',
        'modern-blue': '#d9edf4',
        'sewift-blue': '#6793a8',
        'blue-green': '#10aeb2',
        'light-blue': '#99dbff',
        'lime-green': '#ecf284',
        'sewifit-orange': '#ffc696'
        
      }
    },
  },
  plugins: [],
}