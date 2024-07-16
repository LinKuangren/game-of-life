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
        green_hover: 'var(--green_hover)',
        gray: 'var(--gray)',
        ok: 'var(--ok)',
        error: 'var(--error)',
        error_hover: 'var(--error_hover)',
      },
      gridTemplateRows: {
        holy: 'auto 1fr auto' // -> utility class `grid-rows-holy`
      }
    }
  },
  plugins: []
}
