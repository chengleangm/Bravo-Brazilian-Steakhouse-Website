/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#120807',
        surface: '#1A0E0A',
        accent: '#fd850b',
        gold: '#D4A373',
        warm: '#FFF7ED',
        muted: '#C7B8A8',
        black: '#000000',
        dark: '#120807',
        brown: '#1A0E0A',
        cream: '#FFF7ED',
        yellow: '#D4A373',
        orange: '#fd850b',
        white: '#ffffff',
      },
      fontFamily: {
        sans: [
          'var(--font-body)',
          'Montserrat',
          'Avenir Next',
          'Segoe UI',
          'Arial',
          'Helvetica',
          'sans-serif',
        ],
        serif: [
          'var(--font-display)',
          'Anton',
          'Impact',
          'Arial Narrow',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        custom: '0 24px 70px rgba(0, 0, 0, 0.35)',
        glow: '0 24px 70px rgba(253, 133, 11, 0.28)',
      },
    },
  },
  plugins: [],
}
