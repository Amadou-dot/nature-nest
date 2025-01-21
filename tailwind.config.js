/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      brand: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
      },
      grey: {
        0: '#fff',
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      blue: {
        100: '#e0f2fe',
        700: '#0369a1',
      },
      green: {
        100: '#dcfce7',
        700: '#15803d',
      },
      yellow: {
        100: '#fef9c3',
        700: '#a16207',
      },
      silver: {
        100: '#e5e7eb',
        700: '#374151',
      },
      indigo: {
        100: '#e0e7ff',
        700: '#4338ca',
      },
      red: {
        100: '#fee2e2',
        700: '#b91c1c',
        800: '#991b1b',
      },
      // Dark mode colors
      'dark-grey': {
        0: '#18212f',
        50: '#111827',
        100: '#1f2937',
        200: '#374151',
        300: '#4b5563',
        400: '#6b7280',
        500: '#9ca3af',
        600: '#d1d5db',
        700: '#e5e7eb',
        800: '#f3f4f6',
        900: '#f9fafb',
      },
      'dark-blue': {
        100: '#075985',
        700: '#e0f2fe',
      },
      'dark-green': {
        100: '#166534',
        700: '#dcfce7',
      },
      'dark-yellow': {
        100: '#854d0e',
        700: '#fef9c3',
      },
      'dark-silver': {
        100: '#374151',
        700: '#f3f4f6',
      },
      'dark-indigo': {
        100: '#3730a3',
        700: '#e0e7ff',
      },
      'dark-red': {
        100: '#fee2e2',
        700: '#b91c1c',
        800: '#991b1b',
      },
      fontFamily: {
        serif: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
