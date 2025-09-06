/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // indigo-500
          dark: '#4F46E5',   // indigo-600
          light: '#818CF8',  // indigo-400
        },
        secondary: {
          DEFAULT: '#14B8A6', // teal-500
          dark: '#0D9488',   // teal-600
          light: '#2DD4BF',  // teal-400
        },
        background: {
          DEFAULT: '#0F172A', // slate-900
          card: '#1E293B',   // slate-800
        },
        text: {
          DEFAULT: '#F8FAFC', // slate-50
          muted: '#94A3B8',   // slate-400
        },
        accent: {
          DEFAULT: '#FACC15', // yellow-400
        },
        danger: {
          DEFAULT: '#EF4444', // red-500
        },
        success: {
          DEFAULT: '#22C55E', // green-500
        }
      }
    },
  },
  plugins: [],
}

