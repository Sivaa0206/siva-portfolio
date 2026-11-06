import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07070a',
          900: '#0a0a0f',
          850: '#0e0e14',
          800: '#13131b',
          700: '#1b1b25',
          600: '#262633',
        },
        bone: {
          DEFAULT: '#f2efe9',
          dim: '#c8c4bc',
          muted: '#8d8a94',
        },
        accent: {
          DEFAULT: '#7c6bff',
          soft: '#a99bff',
          deep: '#4b3fd6',
          glow: '#00d4ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '10xl': ['clamp(4rem, 14vw, 13rem)', { lineHeight: '0.85', letterSpacing: '-0.05em' }],
      },
      letterSpacing: {
        tightest: '-0.055em',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        marquee: 'marquee 32s linear infinite',
        'pulse-soft': 'pulseSoft 5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
