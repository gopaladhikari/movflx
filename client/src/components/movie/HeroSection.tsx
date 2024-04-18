export function MoviepageHeroSection() {
	return (
		<section
			style={{
				background:
					"linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(/breadcrumb_bg.jpg) center center / cover no-repeat",
			}}
		>
			<div className="grid h-[70vh] place-content-center space-y-2">
				<h2 className="text-xl font-bold md:text-3xl lg:text-5xl">
					Our <span className="text-yellow">Movie</span>
				</h2>
				<div className="flex h-5 items-center justify-center space-x-4">
					<strong className="text-yellow">Blog</strong>
					<strong>Movie</strong>
				</div>
			</div>
		</section>
	);
}
