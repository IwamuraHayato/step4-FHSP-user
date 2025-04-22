// tailwind.config.js
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    {
      pattern: /^(btn|alert|badge|card|modal|input|select|tabs|tab|dropdown|menu|tooltip|progress|indicator|avatar|chip|collapse|carousel|step|kbd|stat|timeline|toast|swap|rating|join)/,
    },
    {
      pattern: /^bg-/, // 背景色
    },
    {
      pattern: /^text-/, // テキスト色
    },
    {
      pattern: /^border-/, // ボーダー
    },
    {
      pattern: /^hover:bg-/, // ホバー時の背景色
    },
    {
      pattern: /^placeholder-/, // プレースホルダー色
    },
    {
      pattern: /^focus:ring-/, // フォーカスリング
    },
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30%)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(15deg)' },
          '100%': { transform: 'rotate(-15deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        shrink: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.6)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        slideDown: {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
        },
      },
      animation: {
        float: 'float 2.5s ease-in-out infinite',
        jump: 'jump 0.5s ease',
        rotate: 'rotate 0.5s ease',
        shake: 'shake 0.4s ease',
        shrink: 'shrink 0.5s ease',
        slideUp: 'slideUp 0.4s ease-out forwards',
        slideDown: 'slideDown 0.4s ease-in forwards',
      },
      colors: {
        brown: '#562305',
        'custom-brown': '#D4C4B5',
        'custom-hover-brown': '#C4B4A5',
        'custom-dark-brown': '#562305',
        'custom-beige': '#D4C8BB',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};
