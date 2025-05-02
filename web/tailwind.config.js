/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf', // Primary teal
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        secondary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5', // Secondary indigo
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b', // Deep indigo
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#f43f5e', // Rose accent
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8', 
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'Jost': ['Jost', 'sans-serif'],
        'Lobster': ['Lobster', 'cursive'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(30, 27, 75, 0.1)',
        'card-hover': '0 10px 30px rgba(30, 27, 75, 0.15)',
        'dropdown': '0 10px 25px rgba(30, 27, 75, 0.2)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #2dd4bf, #22d3ee)',
        'gradient-secondary': 'linear-gradient(to right, #4f46e5, #8b5cf6)',
        'gradient-dark': 'linear-gradient(to bottom, #0f172a, #1e1b4b)',
      }
    },
  },
  plugins: [],
}