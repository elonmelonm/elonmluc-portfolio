/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Montserrat ', 'sans-serif'],
      },
      colors: {
        'pink-500': '#1D4ED8', // Exemple de couleur personnalisée
        'custom-gray': '#6B7280',
        'custom-light': '#F3F4F6',
      },
    },
  },
  plugins: [],
};