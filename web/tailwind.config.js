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
          50: '#ffffff',
          100: '#fefefe',
          200: '#fdfdfd',
          300: '#fcfcfc',
          400: '#fafafa',
          500: '#ffffff', // Pure white
          600: '#1C4ED8',
          700: '#f5f5f5',
          800: '#f0f0f0',
          900: '#e8e8e8',
          950: '#e0e0e0',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1C4ED8', // Blue primary color
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308', // Warm yellow - for highlights and CTAs
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e', 
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'Jost': ['Jost', 'sans-serif'],
        'Lobster': ['Lobster', 'cursive'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(28, 78, 216, 0.1)',
        'card-hover': '0 10px 30px rgba(28, 78, 216, 0.15)',
        'dropdown': '0 10px 25px rgba(28, 78, 216, 0.2)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1C4ED8, #3B82F6)',
        'gradient-secondary': 'linear-gradient(135deg, #60A5FA, #1C4ED8)',
        'gradient-dark': 'linear-gradient(135deg, #1E3A8A, #1C4ED8)',
      }
    },
  },
  plugins: [],
}