/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    /* 디바이스 분기점 정의 */
    screens: {
      mobile: '360px',
      tablet: '744px',
      pc: '1280px',
    },

    extend: {
      /* tailwind color palette입니다.
      사용 예시: 사용해야 하는 색상 #000000이면 => black-000000
      사용 예시: 사용해야 하는 색상 #7AC555이면 => green-7AC555
      tip: ctrl + f(파일 내 검색)을 누른 후 원하는 색상을 찾아주세요.
      */
      colors: {
        black: {
          '000000': '#000000',
          '171717': '#171717',
          '333236': '#333236',
          '4B4B4B': '#4B4B4B',
        },
        gray: {
          '787486': '#787486',
          '9FA6B2': '#9FA6B2',
          D9D9D9: '#D9D9D9',
          EEEEEE: '#EEEEEE',
          FAFAFA: '#FAFAFA',
          F5F5F5: '#F5F5F5',
        },
        white: '#FFFFFF',
        violet: {
          '5534DA': '#5534DA',
          '8': '#F1EFFD',
        },
        red: {
          D6173A: '#D6173A',
        },
        green: {
          '7AC555': '#7AC555',
        },
        purple: {
          '760DDE': '#760DDE',
        },
        orange: {
          FFA500: '#FFA500',
        },
        blue: {
          '76A5EA': '#76A5EA',
        },
        pink: {
          E876EA: '#E876EA',
        },
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        montserrat: ['var(--font-montserrat)'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.12rem' }], // 12px
        sm: ['0.815rem', { lineHeight: '1.37rem' }], // 13px
        md: ['0.875rem', { lineHeight: '1.5rem' }], // 14px
        lg: ['1rem', { lineHeight: '1.62rem' }], // 16px
        '2lg': ['1.125rem', { lineHeight: '1.62rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '2rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['2rem', { lineHeight: '2.62rem' }], // 32px
        '4xl': ['2.5rem', { lineHeight: '2.62rem' }], // 40px
        '5xl': ['3rem', { lineHeight: '4rem' }], // 48px
        '6xl': ['4.75rem', { lineHeight: '6.25rem' }], // 76px
      },
    },
    animation: {
      'dot-bounce': 'dot-bounce 1.5s infinite',
    },
    keyframes: {
      'dot-bounce': {
        '0%, 80%, 100%': { transform: 'scale(0)' },
        '40%': { transform: 'scale(1)' },
      },
    },
  },
  plugins: [],
};
