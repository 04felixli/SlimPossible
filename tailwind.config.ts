import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      screens: {
        'mobile-S': '320px',
        'mobile-M': '375px',
        'mobile-L': '425px',
        'tablet': '768px',
        'laptop': '1024px',
        'laptop-L': '1440px',
        '4K': '2560px',
      },
      colors: {
        'bg-gradient-light': '#808080',
        'bg-gradient-dark': '#383838',
        'card-bg-gradient-light': '#6B6B6B',
        'card-bg-gradient-dark': '#4D4D4D',
        'button-hover': '#383838',
        'button-color': '#0F0F0F',
      },
    },
  },
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {

  //         "primary": "#ff00ff",

  //         "secondary": "#ff00ff",

  //         "accent": "#00ffff",

  //         "neutral": "#ff00ff",

  //         "base-100": "#ff00ff",

  //         "info": "#0000ff",

  //         "success": "#00ff00",

  //         "warning": "#00ff00",

  //         "error": "#ff0000",
  //       },
  //     },
  //   ],
  // },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
