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
			title: "BASIC",
			price: 7.99,
			videoQuality: "Good",
			videoResolution: "480p",
			screens: 1,
		},
		{
			id: 2,
			title: "STANDARD",
			price: 9.99,
			videoQuality: "Better",
			videoResolution: "1080p",
			screens: 2,
		},
		{
			id: 3,
			title: "PREMIUM",
			price: 12.99,
			videoQuality: "Best",
			videoResolution: "4k+HDR",
			screens: 4,
		},
	],
};
