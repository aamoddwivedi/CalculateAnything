/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sora"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#0B0F14',
          900: '#101720',
          800: '#161F2B',
          700: '#1F2A38',
          600: '#2C3B4D',
        },
        amber: {
          400: '#F5B942',
          500: '#EDA524',
        },
        teal: {
          400: '#3ED9C4',
          500: '#22B8A6',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245,185,66,0.15), 0 8px 24px -8px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
