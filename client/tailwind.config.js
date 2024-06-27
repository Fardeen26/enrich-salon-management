// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// const withMT = require("@material-tailwind/react/utils/withMT");
 
// module.exports = withMT({
//   content: ["./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include Material Tailwind content paths (if applicable)
  ],
  theme: {
    extend: {}, // Add your theme customizations here
  },
  plugins: [
    // Add any Tailwind plugins you want to use
    require("@material-tailwind/react"), // Include Material Tailwind plugin
  ],
};