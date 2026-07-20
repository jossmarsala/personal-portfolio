import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ECECEC',
        ink: '#111111',
        muted: '#666666',
        charcoal: '#222222',
        accent: {
          orange: 'var(--accent-orange)',
          pink: 'var(--accent-pink)',
          blue: 'var(--accent-blue)',
          sage: 'var(--accent-sage)',
          yellow: 'var(--accent-yellow)',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        '9xl': ['8rem', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      maxWidth: {
        'editorial': '1440px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}

export default config
