/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        // Site public (refonte indigo)
        display: ['"Bricolage Grotesque"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        // Admin (identité d'origine)
        primary: '#3b82f6',
        secondary: '#6b7280',
        highlight: '#fef08a',
        'dark-bg': '#030712',
        'light-bg': '#ffffff',
        // Site public : tokens pilotés par les variables CSS de index.css
        paper: token('paper'),
        surface: token('surface'),
        ink: token('ink'),
        muted: token('muted'),
        rule: token('rule'),
        indigo: token('indigo'),
        'indigo-soft': token('indigo-soft'),
        live: token('live'),
        whatsapp: '#1FA855',
      },
    },
  },
  plugins: [],
};
