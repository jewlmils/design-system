/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        // layout
        venus_blue: "#E9EEF6", // background color for the main container
        light_wash: "#4169E126", // hover state for sidebar
        anti_flash_white: "#F2F3F4", // main content background

        // text
        midnight: "#1A1D29", // primary text color

        // buttons
        planetary_blue: "#4169E1", // primary button color
        powder_blue: "#4169E180", // hover state for primary button

        // table
        tableHead: "#E6E0E9",
        tableRow: "#F3EDF7",

        // input fields
        carbon: "#79747E", // placeholder text color
      },
    },
  },
  plugins: [],
}