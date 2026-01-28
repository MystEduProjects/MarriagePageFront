/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-cream': '#faf9f6',
        'wedding-dark': '#2d3436',
        'wedding-sage': '#b2bec3',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'], // Fuente elegante para títulos
        'sans': ['Inter', 'sans-serif'],        // Fuente limpia para lectura
      },
      boxShadow: {
        'soft': '0 4px 20px -10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}