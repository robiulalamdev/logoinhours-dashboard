/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "10px",
        screens: {
          "2xl": "1440px",
        },
      },
      colors: {
        primary_gw: "#FAFAFA",
        primary: "#F78C21",
      },
      fontFamily: {
        inter: ["Inter", "serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
});
