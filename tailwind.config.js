export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neel: { 900: '#0F1A4A', 700: '#1B2A6B', 500: '#3A55C4', 100: '#E3E8F8' },
        sun: '#F5B700',
        chalk: '#F3F5FA',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: { marquee: { to: { transform: 'translateX(-50%)' } } },
      animation: { marquee: 'marquee 28s linear infinite' },
    },
  },
  plugins: [],
}

