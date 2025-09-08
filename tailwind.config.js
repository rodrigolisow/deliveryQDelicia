/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4e3',
          100: '#fae8c8',
          200: '#f5d192',
          300: '#f0ba5c',
          400: '#eba426',
          500: '#d69e2e',
          600: '#b17d20',
          700: '#8c5d16',
          800: '#67410e',
          900: '#422605'
        },
        warm: {
          50: '#fefdfb',
          100: '#fdf9f0',
          200: '#faf1e0',
          300: '#f7e8cf',
          400: '#f3dfbe',
          500: '#f0d6ad',
          600: '#c0ab8a',
          700: '#908068',
          800: '#605545',
          900: '#302a23'
        }
      },
      fontFamily: {
        'display': ['system-ui', 'sans-serif'],
        'body': ['system-ui', 'sans-serif']
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
