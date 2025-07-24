import { Config } from 'tailwindcss';

export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.jsx',
    './resources/**/*.ts',
    './resources/**/*.tsx',
  ],
  darkMode: 'class',
  theme: {
    extend: {      colors: {
        // Thème NewsZone
        'neon-blue': '#00A3E0',
        'anthracite': '#2D3748',
        'lemon-yellow': '#F7E025',
        'pure-white': '#FFFFFF',
        'matte-black': '#111827',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#00A3E0', // Bleu néon comme couleur primaire
          600: '#0088c7',
          700: '#006ea3',
          800: '#005580',
          900: '#003c5c',
        },
        secondary: {
          50: '#f7f8fa',
          100: '#edf0f4',
          200: '#d7dde6',
          300: '#b5c0d1',
          400: '#8d9fb8',
          500: '#6f82a2',
          600: '#5a6a8a',
          700: '#4a5770',
          800: '#2D3748', // Gris anthracite
          900: '#1a202c',
        },
        accent: {
          50: '#fefdf0',
          100: '#fdfbe0',
          200: '#fbf6c0',
          300: '#f8ed95',
          400: '#f4de68',
          500: '#F7E025', // Jaune citron
          600: '#e8c91f',
          700: '#c2a518',
          800: '#9c8114',
          900: '#7d6711',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
