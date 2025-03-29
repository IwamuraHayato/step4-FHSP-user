// tailwind.config.js
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          brown: '#562305',
        },
        fontFamily: {
          sans: ['Montserrat', 'sans-serif'],
        },
      },
    },
    plugins: [
        require('daisyui'), 
    ],
  };
  