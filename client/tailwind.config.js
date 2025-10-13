const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        vercel: {
          primary: "#0a0a0a",
          secondary: "#cfcfcf",
          accent: "#0054b3",
          neutral: "#8c837e",
          "base-100": "#0d0d0d",
          info: "#7fbdd1",
          success: "#5ea96a",
          warning: "#d8b866",
          error: "#d68a91",
        },
      },
      "black",
    ],
  },
};
