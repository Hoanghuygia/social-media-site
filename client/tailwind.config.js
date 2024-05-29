/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'pastel-pink-100': '#fef9f8',
        'pastel-pink-200': '#efd1d8',
        'pastel-pink-300': '#efcacc',
        'pastel-purple-100': '#fcf9ff',
        'pastel-purple-200': '#d6cae3',
        'pastel-purple-300': '#cac3e4',

      },
      fontFamily:{
        'khumb-sans': ['Kumbh Sans Variable', 'sans-serif'],
        'inter': ['Inter Variable', 'sans-serif']
      }
    },
  },
  plugins: [],
}
