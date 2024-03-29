import { type Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{tsx,ts,jsx,jsx}",
    "./components/**/*.{tsx,ts,jsx,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'header-green': '#A2D29E',
        'button-green': '#2B762A'
      },
      backgroundImage: {
        'leaves-tables': "url('../images/wooden-tables-leaves.jpg')"
      },
      fontFamily: {
        "sans": 'var(--font-alegreya)',
        "mono": 'var(--font-lato)',
        "logo": 'var(--font-koulen)'
      }
    },
  },
  plugins: [],
} satisfies Config;
