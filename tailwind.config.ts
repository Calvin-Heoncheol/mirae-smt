import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effdfb',
          100: '#cdf9f3',
          200: '#9bf2e8',
          300: '#60e5d8',
          400: '#2dccc1',
          500: '#16b3a8',
          600: '#0e9088',
          700: '#0f7670',
          800: '#125e5a',
          900: '#134e4a',
          950: '#042d2c',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b1b8c8',
          400: '#8791a8',
          500: '#69748d',
          600: '#535c74',
          700: '#444b5e',
          800: '#3a4050',
          900: '#252a36',
          950: '#14171f',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          '2xl': '1280px',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
