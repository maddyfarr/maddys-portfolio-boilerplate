const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', '../../apps/**/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',  // Uses the CSS variable
        background: 'var(--color-bg)',    // Uses the CSS variable
        foreground: 'var(--color-fg)',    // Uses the CSS variable
        secondary: 'var(--color-secondary)', // Uses the CSS variable
        accent: 'var(--color-accent)',    // Uses the CSS variable
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      // The CSS variables are defined in tokens.css and imported via the main index.ts
      // This plugin just ensures Tailwind can use them
    }),
  ],
};
