/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './.vitepress/theme/**/*.vue',
    './**/**/*.vue',
    './**/**/*.md',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}