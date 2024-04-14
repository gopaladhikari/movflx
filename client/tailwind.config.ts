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
			container: {
				screens: {
					sm: "640px",
					md: "768px",
					lg: "1024px",
					xl: "1280px",
					"2xl": "1420px",
				},
			},
		},
	},
	darkMode: ["class"],
	plugins: [nextui()],
};
export default config;
