import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--poppins",
});

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
});

export { poppins, inter };
