/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        accent:  '#4F46E5',
        'accent-bg': '#EEEDF9',
        ink:     '#111113',
        'ink-2': '#4A4A52',
        'ink-3': '#9898A0',
        border:  '#EBEBEC',
        surface: '#FFFFFF',
        bg:      '#F7F7F8',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '14px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.06)',
        md: '0 4px 12px rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}
