import { nextui } from "@nextui-org/react";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#e4d804",
        black: "#0F0E16",
      },
    },
  },
  darkMode: ["class"],
  plugins: [nextui()],
};
export default config;
