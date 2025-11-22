/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#142d63',
        'teal': '#028393',
        'orange': '#f65625',
        'soft-orange': '#faaa68',
      },
      animation: {
        'spin-fast': 'spin 0.5s linear',
        'fade-in': 'fadeIn 0.5s ease-in',
        'confetti': 'confetti-fall 5s linear forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
