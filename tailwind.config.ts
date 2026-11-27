import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#edebe5',
          light: '#f5f3ee',
        },
        ink: {
          DEFAULT: '#121210',
          soft: '#3b3a36',
          muted: '#6e6c64',
          black: '#0b0b0a',
        },
        bone: '#f2f0ea',
        signal: '#cf4a2c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.06em',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
