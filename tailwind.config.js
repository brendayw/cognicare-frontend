/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",   
    "./src/**/*.{html,js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        'primary': '#94a3b8',     
        'secondary': '#0f172a', 
        'testiary': '#ffffff83',
        'soft': '#89898a',
        'dark': '#626263',
        'white': '#ffffff',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'cabin': ['Cabin', 'serif'],
      },
      // height: {
      //   'screen': '100vh',
      // }
    },
  },
  plugins: [],
}

