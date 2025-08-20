/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class
  theme: {
    extend: {
      screens: {
        xs: '390px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      // Usando el espaciado por defecto de Tailwind
      spacing: {},
      // https://tailwindcss.com/docs/theme
      colors: {
        transparent: 'transparent',
        primary: '#232F3E',
        accent: '#55A5E2',
        secondary: '#0D1C2A',
        text: '#000000'
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif']
      }
    }
  },
  plugins: []
}
