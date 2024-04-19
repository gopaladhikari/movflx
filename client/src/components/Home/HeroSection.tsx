export function HomepageHeroSection() {
	return (
		<section
			className="min-h-screen space-y-4 px-4 md:pl-[8%]"
			style={{
				background: "url(/banner_bg01.jpg) center center / cover no-repeat",
				objectFit: "contain",
			}}
		>
			<h1 className="pt-[20%] text-2xl font-bold text-yellow md:pt-[14%]">
				Movflx
			</h1>
			<h2 className="text-4xl font-bold md:text-5xl">
				Unlimited <span className="text-yellow">Movie</span>, TVs
			</h2>
			<h2 className="text-4xl font-bold md:text-5xl">Shows, & More.</h2>
			watchnow btn
		</section>
	);
}
