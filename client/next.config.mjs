/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "m.media-amazon.com",
				pathname: "/images/**",
			},
			{
				protocol: "http",
				hostname: "res.cloudinary.com",
			},
		],
	},
};

export default nextConfig;
