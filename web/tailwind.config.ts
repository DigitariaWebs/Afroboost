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
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
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
      },
    },
  },
  plugins: [],
};

export default config;
