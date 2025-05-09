/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#E6EEFF',
          100: '#CCDDFF',
          200: '#99BBFF',
          300: '#6699FF',
          400: '#3377FF',
          500: '#3366FF',
          600: '#0044FF',
          700: '#0033CC',
          800: '#002299',
          900: '#001166',
        },
        teal: {
          50: '#E6FFFF',
          100: '#CCFFFF',
          200: '#99FFFF',
          300: '#66FFFF',
          400: '#33FFFF',
          500: '#00CCCC',
          600: '#009999',
          700: '#006666',
          800: '#003333',
          900: '#001A1A',
        },
        orange: {
          50: '#FFF2E6',
          100: '#FFE6CC',
          200: '#FFCC99',
          300: '#FFB366',
          400: '#FF9933',
          500: '#FF6600',
          600: '#CC5200',
          700: '#993D00',
          800: '#662900',
          900: '#331400',
        },
        green: {
          50: '#E6FFF2',
          100: '#CCFFE6',
          200: '#99FFCC',
          300: '#66FFB3',
          400: '#33FF99',
          500: '#00CC66',
          600: '#009940',
          700: '#006626',
          800: '#003313',
          900: '#00190A',
        },
        yellow: {
          50: '#FFFDE6',
          100: '#FFFBCC',
          200: '#FFF799',
          300: '#FFF466',
          400: '#FFF033',
          500: '#FFCC00',
          600: '#CCA300',
          700: '#997A00',
          800: '#665200',
          900: '#332900',
        },
        red: {
          50: '#FFE6E6',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF3333',
          500: '#FF0000',
          600: '#CC0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideInUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}