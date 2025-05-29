/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['Press Start 2P', 'monospace', 'ui-monospace', 'SFMono-Regular'],
        'mono': ['Space Mono', 'monospace', 'ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        'pixel-primary': '#FF6B6B',
        'pixel-secondary': '#4ECDC4',
        'pixel-accent': '#FFE66D',
        'pixel-dark': '#1A535C',
        'pixel-light': '#F7FFF7',
      },
      borderWidth: {
        '3': '3px',
        '6': '6px',
      },
      animation: {
        'pixel-bounce': 'pixel-bounce 1s infinite',
        'pixel-float': 'pixel-float 3s ease-in-out infinite',
        'pixel-glitch': 'pixel-glitch 2s steps(10) infinite',
      },
      keyframes: {
        'pixel-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pixel-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pixel-glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, 2px)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '30%': { transform: 'translate(-2px, -2px)' },
          '40%': { transform: 'translate(2px, 2px)' },
          '50%': { transform: 'translate(-2px, 2px)' },
          '60%': { transform: 'translate(2px, -2px)' },
          '70%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(2px, 2px)' },
          '90%': { transform: 'translate(-2px, 2px)' },
        },
      },
    },
  },
  plugins: [],
}
