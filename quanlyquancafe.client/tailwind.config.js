/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens } from 'fluid-tailwind'

const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");

module.exports = withMT({

  content: {
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      flowbite.content(),
    ],
    extract
  } ,
  theme: {
    screens,
    extend: {
      colors: {
        primary: {
          50: "#ffe8c7",
          100 :"#f8cbab",
          200 : "#deac8b",
          300 :"#c28e68",
          400: "#ad754d",
          500: "#975e33",
          600 :"#8b542d",
          700 : "#7b4724",
          800 : "#6d391d",
          900 :"#5d2b14",

        },
        cream: "#FFF8E7",
        keyframes: {
          "fade-up": {
            "0%": {
              opacity: "0",
              transform: "translateY(20px)",
            },
            "100%": {
              opacity: "1",
              transform: "translateY(0)",
            },
          },
          "fade-in": {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
        },
        animation: {
          "fade-up": "fade-up 0.8s ease-out forwards",
          "fade-in": "fade-in 0.6s ease-out forwards",
        },
      }

    },
    
  },
  plugins: [
    fluid, flowbite.plugin(),
  ],
});

