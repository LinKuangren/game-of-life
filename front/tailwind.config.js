/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: 'var(--dark)',
        white: 'var(--white)',
        blueF: 'var(--blueF)',
        green: 'var(--green)',
        gray: 'var(--gray)',
      }
    }
  },
  plugins: []
}
