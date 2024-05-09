export const site = {
	name: "Movflx - Online Movies & Tv Shows",
	description:
		"MovFlx: Your ultimate destination for movie discovery, reviews, and trailers.",
	url: "https://movflx-eight.vercel.app",
	mainNav: [
		{
			id: 1,
			title: "Home",
			href: "/",
		},
		{
			id: 2,
			title: "Movies",
			href: "/movies?page=1",
		},

		{
			id: 3,
			title: "Theaters",
			href: "/theaters",
		},
		{
			id: 4,
			title: "Pricing",
			href: "/pricing",
		},
		{
			id: 5,
			title: "Contact",
			href: "/contact",
		},
	],

	pricingPlans: [
		{
			id: 1,
			plan: "basic",
			price: 799,
			videoQuality: "Good",
			videoResolution: "480p",
			screens: 1,
		},
		{
			id: 2,
			plan: "standard",
			price: 999,
			videoQuality: "Better",
			videoResolution: "1080p",
			screens: 2,
		},
		{
			id: 3,
			plan: "premium",
			price: 1299,
			videoQuality: "Best",
			videoResolution: "4k+HDR",
			screens: 4,
		},
	],

	paymentMethod: [
		{
			id: 1,
			name: "Esewa",
			img: "/esewa.png",
		},
		{
			id: 2,
			name: "Khalti",
			img: "/khalti.png",
		},
	],
};
