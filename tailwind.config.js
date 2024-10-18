/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "node_modules/daisyui/dist/**/*.js"],
  theme: {
    extend: {
      // Customizations
    },
    daisyui: {
      themes: [
        {
          mytheme: {
            primary: "#1D4ED8", // Example color
            secondary: "#9333EA",
          },
        },
      ],
    },
  },
  plugins: [require("daisyui")],
};
