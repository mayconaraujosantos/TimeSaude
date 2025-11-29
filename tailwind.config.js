/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // New Design System - Purple Theme (from wireframe)
        primary: '#7B5FFF',
        'primary-dark': '#6347E8',
        secondary: '#FF6B9D',
        accent: '#FFB800',
        background: '#F5F5F5',
        'card-light': '#F8F7FF',
        'card-purple': '#E8E1FF',
        'card-pink': '#FFE1EE',
        'card-blue': '#D4E7FF',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B7280',
        'text-light': '#9CA3AF',

        // Material Design 3 - Light theme (legacy compatibility)
        'on-primary': '#FFFFFF',
        'primary-container': '#EADDFF',
        'on-primary-container': '#21005D',

        secondary: '#625B71',
        'on-secondary': '#FFFFFF',
        'secondary-container': '#E8DEF8',
        'on-secondary-container': '#1D192B',

        tertiary: '#7D5260',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#FFD8E4',
        'on-tertiary-container': '#31111D',

        error: '#B3261E',
        'on-error': '#FFFFFF',
        'error-container': '#F9DEDC',
        'on-error-container': '#410E0B',

        'on-background': '#1C1B1F',

        surface: '#FFFBFE',
        'on-surface': '#1C1B1F',
        'surface-variant': '#E7E0EC',
        'on-surface-variant': '#49454F',

        outline: '#79747E',
        'outline-variant': '#CAC4D0',
      },
    },
  },
  plugins: [],
};
