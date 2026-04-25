import type { Config } from 'tailwindcss'

const config: Config = {
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
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config