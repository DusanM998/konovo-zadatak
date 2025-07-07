import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        reveal: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        reveal: "reveal 1.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
