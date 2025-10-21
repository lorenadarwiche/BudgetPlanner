/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9accff',      // light blue
        secondary: '#ccffff',    // very light cyan
        accent: '#ffcc9a',       // light orange/peach
        success: '#ccffcc',      // light green
        warning: '#ffffcc',      // light yellow
      },
    },
  },
  plugins: [],
}
