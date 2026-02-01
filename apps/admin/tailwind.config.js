/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warmth: {
          50: 'var(--warmth-50)',
          100: 'var(--warmth-100)',
          200: 'var(--warmth-200)',
          300: 'var(--warmth-300)',
          500: 'var(--warmth-500)',
          700: 'var(--warmth-700)',
          900: 'var(--warmth-900)',
        },
        room: {
          living: 'var(--living-room)',
          kitchen: 'var(--kitchen)',
          garden: 'var(--garden)',
          gallery: 'var(--gallery)',
          bedroom: 'var(--bedroom)',
          private: 'var(--private-room)',
        }
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        decorative: ['Crimson Pro', 'serif'],
        handwriting: ['Kalam', 'cursive'],
      },
      borderRadius: {
        'base': 'var(--radius-md)',
      },
      boxShadow: {
        'soft': 'var(--shadow-md)',
        'soft-lg': 'var(--shadow-lg)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'appear': 'appear 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(4px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        appear: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
