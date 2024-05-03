/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,svelte}'],
  theme: {
    extend: {
      colors: {
        main: '#88C0D0',
        sub: '#81A1C1',
      },
    },
  },
  plugins: [],
};
