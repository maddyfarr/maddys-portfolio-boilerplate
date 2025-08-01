const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', '../../apps/**/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        foreground: 'var(--color-fg)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ':root': {
          '--color-bg': '#ffffff',
          '--color-fg': '#111827',
          '--color-primary': '#2563eb',
          '--color-secondary': '#f3f4f6',
          '--color-accent': '#f59e0b',
        },
        '.dark': {
          '--color-bg': '#111827',
          '--color-fg': '#ffffff',
          '--color-primary': '#3b82f6',
          '--color-secondary': '#1f2937',
          '--color-accent': '#facc15',
        },
      });
    }),
  ],
};
