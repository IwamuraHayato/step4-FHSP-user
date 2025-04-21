// tailwind.config.js
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    // 既存のクラス
    'btn', 'btn-primary', 'btn-secondary', 'btn-accent', 'btn-neutral',
    'alert', 'alert-success', 'alert-error', 'badge', 'badge-primary',
    'card', 'modal', 'modal-box', 'input', 'select', 'tabs', 'tab', 'tab-active',
    'dropdown', 'dropdown-content', 'menu', 'menu-title',
    // 追加: カスタムカラーのクラス
    'bg-\\[#D4C4B5\\]', 'hover:bg-\\[#C4B4A5\\]', 'text-\\[#562305\\]',
    'border-\\[#D4C8BB\\]', 'placeholder-\\[#D4C8BB\\]', 'focus:ring-\\[#D4C8BB\\]',
    // または正規表現パターンでカバー
    'bg-\\[#.*\\]', 'text-\\[#.*\\]', 'border-\\[#.*\\]', 'hover:bg-\\[#.*\\]'
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
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};
