/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', 'serif'],
      },
      cursor: {
        hammer: 'url(/impermanence/hammer2.png), auto',
        custom: 'url(/impermanence/cursor.png), auto',
      },
    },
  },
  plugins: [],
}

