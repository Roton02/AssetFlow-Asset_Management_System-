/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        purple: "#a85be7"
      },
      animation: {
        'move-left-right': 'moveLeftRight 2s infinite alternate',
    },
    keyframes: {
        moveLeftRight: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(20px)' },
        },
    },
    },
  },
}