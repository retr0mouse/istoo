import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'header-green': '#A2D29E',
        'button-green': '#2B762A'
      },
      backgroundImage: {
        'leaves-tables': "url('../images/wooden-tables-leaves.jpg')"
      }
    },
  },
  plugins: [],
} satisfies Config;
