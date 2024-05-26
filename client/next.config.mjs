import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "m.media-amazon.com",
				pathname: "/images/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
