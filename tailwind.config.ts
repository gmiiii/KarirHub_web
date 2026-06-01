import type { Config } from 'tailwindcss';
// Token terpusat (Material 3). Sinkron dengan repo KarirHub_mobile (tokens.js).
const tokens = require('./tokens.js');

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      fontSize: tokens.fontSize,
      boxShadow: tokens.boxShadow,
      fontFamily: tokens.fontFamily,
      maxWidth: { app: tokens.containers['app-max'] },
      transitionTimingFunction: {
        // ease-out eksponensial (panduan impeccable: no bounce/elastic)
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
