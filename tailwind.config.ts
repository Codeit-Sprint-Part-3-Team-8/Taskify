import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
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
        },
        white: {
          FFFFFF: '#FFFFFF',
        },
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
    },
  },
  plugins: [],
} satisfies Config
