/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans your files
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Enables @apply font-inter
      },
      colors: {
        // Add custom colors if needed later
        'teal-500': '#14b8a6',
        'teal-600': '#0d9488',
      },
      backgroundImage: {
        'stars': "url('/assets/stardust.png')",
      },
    },
  },
  plugins: [], 
};
