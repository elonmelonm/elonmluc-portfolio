/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        highlight: '#fef08a',
        'dark-bg': '#030712',
        // 'dark-bg': '#111827',
        'light-bg': '#ffffff',
      },
    },
  },
  plugins: [],
};