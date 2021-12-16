const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './apps/**/src/*.html',
      './apps/**/src/app/*.{html,ts}',
      './libs/brewdude-io/ui/pages/src/lib/**/*.{html,ts}',
      './libs/brewdude-io/ui/components/src/lib/**/*.{html,ts}',
    ],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
