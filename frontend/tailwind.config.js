/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '16/9': '16 / 9',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backgroundImage: {
        'wave-pattern': "url('https://www.transparenttextures.com/patterns/wave.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}


