// const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2563eb',
          secondary: '#6b7280',
          accent: '#84cc16',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#1e40af',
          success: '#16a34a',
          warning: '#ea580c',
          error: '#e11d48',
        },
      },
    ],
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/uikit/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx}',
    './src/layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        paddingScreen: 'calc(100% - 32px)',
      },
      maxWidth: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        10: '2.5rem',
        20: '5rem',
        paddingScreen: 'calc(100% - 32px)',
      },
      maxHeight: {
        80: '80vh',
        85: '85vh',
        90: '90vh',
      },
      zIndex: {
        9999: 9999,
        99999: 99999,
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        size: 'height, width',
        spacing: 'margin, padding',
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('@tailwindcss/line-clamp'),
    // plugin(function ({ addComponents, theme }) {
    //   addComponents({
    //     '.input-base': {
    //       marginTop: 'transform',
    //     },
    //   })
    // }),
  ],
}
