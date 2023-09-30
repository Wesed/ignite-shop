import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  plugins: [],
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      gray900: '#121214',
      gray800: '#202024',
      gray400: '#8D8D99',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',
      green500: '#00875f',
      green300: '#00b37e',
    },
    backgroundImage: {
      gradient: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    },
    fontFamily: {
      sans: 'Roboto',
    },
    maxWidth: {
      widthProject: '1180px',
      widthCarousel: 'calc(100vw - ((110vw - 1180px) / 2))',
    },
    boxShadow: {
      '3xl': '0 0 60px rgba(0, 0, 0, 0.8)',
    },
  },
}
export default config
