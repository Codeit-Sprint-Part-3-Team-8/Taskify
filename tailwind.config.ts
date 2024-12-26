/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ['class'],
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
  	screens: {
  		mobile: '360px',
  		tablet: '744px',
  		pc: '1280px'
  	},
  	extend: {
  		colors: {
  			black: {
  				'171717': '#171717',
  				'333236': '#333236',
  				'000000': '#000000',
  				'4B4B4B': '#4B4B4B'
  			},
  			gray: {
  				'787486': '#787486',
  				'9FA6B2': '#9FA6B2',
  				D9D9D9: '#D9D9D9',
  				EEEEEE: '#EEEEEE',
  				FAFAFA: '#FAFAFA'
  			},
  			white: '#FFFFFF',
  			violet: {
  				'8': '#F1EFFD',
  				'5534DA': '#5534DA'
  			},
  			red: {
  				D6173A: '#D6173A'
  			},
  			green: {
  				'7AC555': '#7AC555'
  			},
  			purple: {
  				'760DDE': '#760DDE'
  			},
  			orange: {
  				FFA500: '#FFA500'
  			},
  			blue: {
  				'76A5EA': '#76A5EA'
  			},
  			pink: {
  				E876EA: '#E876EA'
  			}
  		},
  		fontFamily: {
  			pretendard: [
  				'var(--font-pretendard)'
  			],
  			montserrat: [
  				'var(--font-montserrat)'
  			]
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1.12rem'
  				}
  			],
  			sm: [
  				'0.815rem',
  				{
  					lineHeight: '1.37rem'
  				}
  			],
  			md: [
  				'0.875rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1rem',
  				{
  					lineHeight: '1.62rem'
  				}
  			],
  			'2lg': [
  				'1.125rem',
  				{
  					lineHeight: '1.62rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'2rem',
  				{
  					lineHeight: '2.62rem'
  				}
  			],
  			'4xl': [
  				'2.5rem',
  				{
  					lineHeight: '2.62rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '4rem'
  				}
  			],
  			'6xl': [
  				'4.75rem',
  				{
  					lineHeight: '6.25rem'
  				}
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
