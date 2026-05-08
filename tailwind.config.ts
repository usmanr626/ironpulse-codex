import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#050505",
          900: "#0a0a0a",
          850: "#101010",
          800: "#171717",
        },
        ember: {
          400: "#ff9a3d",
          500: "#ff6b2a",
          600: "#d94319",
        },
      },
      boxShadow: {
        ember: "0 0 34px rgba(255, 107, 42, 0.24)",
        metal: "inset 0 1px 0 rgba(255,255,255,0.16), 0 24px 70px rgba(0,0,0,0.48)",
      },
    },
  },
  plugins: [],
};

export default config;
