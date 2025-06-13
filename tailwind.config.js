/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBlack: "#080404",
        black1: "#101414",
        lightBlack: "#0e1113",
        postBlack: "#181c1f",
        lightBrown: "#7c290c",
        orangeR: "#ff4500",
        fireOrange: "#ff4000",
        beige: "#d9b99b"
      }
    },
  },
  plugins: [],                                      // will add plugins, cuz they contain many good frontend components
}