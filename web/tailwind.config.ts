import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0E1A14',
        surface: '#15221C',
        'surface-elevated': '#1A2B22',
        'surface-high': '#22372D',
        border: '#2A3D34',
        'border-strong': '#3D5448',

        primary: {
          DEFAULT: '#1F8A55',
          fg: '#F2F7F4',
          muted: '#15643E',
        },
        accent: {
          DEFAULT: '#E8B84A',
          fg: '#1A1410',
          muted: '#A57A2D',
          soft: '#3A2E14',
          'gradient-from': '#F2C95C',
          'gradient-to': '#B8842A',
        },
        deep: '#5B2A4F',

        foreground: '#F2F7F4',
        muted: {
          DEFAULT: '#9BB0A6',
          fg: '#6F857B',
        },

        success: '#3DAA68',
        warning: '#E8B84A',
        danger: '#E25C5C',
        info: '#6FA8E0',
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        display: ['var(--font-fraunces)', 'var(--font-instrument-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '3.75rem', letterSpacing: '-0.0875rem' }],
        display: ['2.75rem', { lineHeight: '3.125rem', letterSpacing: '-0.075rem' }],
        h1: ['2rem', { lineHeight: '2.375rem', letterSpacing: '-0.0375rem' }],
        h2: ['1.5rem', { lineHeight: '1.875rem', letterSpacing: '-0.01875rem' }],
        h3: ['1rem', { lineHeight: '1.375rem', letterSpacing: '-0.00625rem' }],
        body: ['0.875rem', { lineHeight: '1.375rem' }],
        caption: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.0125rem' }],
        overline: ['0.6875rem', { lineHeight: '0.875rem', letterSpacing: '0.0875rem' }],
        metric: ['2.375rem', { lineHeight: '2.625rem', letterSpacing: '-0.05rem' }],
        'metric-lg': ['3.5rem', { lineHeight: '3.875rem', letterSpacing: '-0.0875rem' }],
      },
      borderRadius: {
        xs: '6px',
        sm: '10px',
        DEFAULT: '14px',
        md: '18px',
        lg: '22px',
        xl: '28px',
      },
      spacing: {
        '4.5': '1.125rem',
      },
      boxShadow: {
        glow: '0 8px 32px rgba(31,138,85,0.25)',
        'glow-gold': '0 8px 32px rgba(232,184,74,0.25)',
        elevated: '0 10px 28px rgba(0,0,0,0.45)',
      },
      animation: {
        'pulse-orb': 'pulseOrb 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 12s linear infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 600ms ease-out both',
        marquee: 'marquee 38s linear infinite',
        'marquee-slow': 'marquee 64s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        shine: 'shine 2.4s linear infinite',
        'caret-blink': 'caretBlink 1s steps(1) infinite',
        drift: 'drift 18s ease-in-out infinite',
        breathe: 'breathe 6s ease-in-out infinite',
        spotlight: 'spotlight 14s ease-in-out infinite',
        'tilt-loop': 'tiltLoop 9s ease-in-out infinite',
      },
      keyframes: {
        pulseOrb: {
          '0%, 100%': { transform: 'scale(0.96)', opacity: '0.85' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
        rotateSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' },
        },
        caretBlink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(40px,-30px,0) scale(1.08)' },
          '66%': { transform: 'translate3d(-30px,30px,0) scale(0.96)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        },
        spotlight: {
          '0%, 100%': { transform: 'translate(0%, 0%)' },
          '50%': { transform: 'translate(8%, -6%)' },
        },
        tiltLoop: {
          '0%, 100%': { transform: 'rotate(-2deg) translateY(0)' },
          '50%': { transform: 'rotate(2deg) translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
