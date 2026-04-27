import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#0F172A',
        navy: '#102544',
        'navy-soft': '#1E3A5F',
        muted: '#F8FAFC',
        border: '#E2E8F0',
        'text-soft': '#475569',
      },
      borderRadius: {
        xl2: '1rem',
      },
      maxWidth: {
        content: '72rem',
      },
      boxShadow: {
        calm: '0 10px 30px rgba(15, 23, 42, 0.06)',
        glow: '0 20px 60px rgba(16, 37, 68, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-up-delay-1': 'fade-up 0.7s ease-out 0.15s both',
        'fade-up-delay-2': 'fade-up 0.7s ease-out 0.3s both',
        'fade-up-delay-3': 'fade-up 0.7s ease-out 0.45s both',
        'fade-in-slow': 'fade-in 1.2s ease-out both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config