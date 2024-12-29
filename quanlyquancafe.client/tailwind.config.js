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

        blue: {
          50: "#eff6ff", // Màu xanh rất nhạt
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", 
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },

        green: {
          50: "#f0fdf4", 
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        purple: {
          50: "#f5f3ff", 
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
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

