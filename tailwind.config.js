/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    screens: { sm: "330px", md: "600px", lg: "1200px" },
    fontFamily: {
      "nunito-sans": "Nunito Sans , sans-serif",
    },
    listStyleType: {
      square: "square",
      disc: "disc",
    },
    extend: {
      colors: {
        white: "hsl(0, 0%, 100%)",
        lightMode: {
          verydarkblue: "hsl(200, 15%, 8%)",
          darkgray: "hsl(0, 0%, 52%)",
          verylightgray: "hsl(0, 0%, 98%)",
        },
        darkMode: {
          darkblue: "hsl(209, 23%, 22%)",
          verydarkblue: "hsl(207, 26%, 17%)",
        },
      },
    },
  },
  plugins: [],
};
