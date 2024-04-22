import { HomepageHeroSection } from "@/components/Home/HeroSection";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { MovieCard } from "@/components/movie/MovieCard";
import { getMovies } from "@/lib/movies";
import Image from "next/image";

export default async function page() {
	const res = await getMovies(0, 12);
	return (
		<main>
			<HomepageHeroSection />

			{/* Upcoming movie section */}

			<section>
				<MaxwidthWrapper className="my-8 space-y-4 md:my-16">
					<p className="text-sm font-bold text-yellow">ONLINE STREAMING</p>
					<h3 className="text-xl font-bold md:text-3xl">
						Upcoming Movies
					</h3>
					<div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
						{res?.movies?.slice(0, 6).map((movie) => (
							<MovieCard key={movie?._id} movie={movie} />
						))}
					</div>
				</MaxwidthWrapper>
			</section>

			{/* Download Your Shows Watch Offline section. */}
			<section className="my-24 bg-black py-8">
				<MaxwidthWrapper className="my-8 items-center gap-16 space-y-4 md:my-16 lg:flex">
					<Image
						src="/services_img.jpg"
						height={545}
						width={510}
						className="h-[580px] basis-1/2 object-contain"
						alt="services image "
					/>
					<div className="space-y-3">
						<strong className="flex items-center gap-2">
							<p className="h-1 w-12 rounded-xl bg-yellow" /> Our
							Services
						</strong>
						<h3 className="text-3xl font-bold md:text-4xl">
							Download Your Shows Watch Offline.
						</h3>
						<p>
							Get the latest movies and shows in your phone. Watch
							offline.
						</p>
						<div className="flex items-center gap-6">
							<span className="rounded-full border border-yellow p-4 shadow-lg transition-colors hover:bg-yellow hover:text-black">
								icon
							</span>
							<div className="space-y-2">
								<h3 className="text-xl font-bold">Enjoy on Your TV.</h3>
								<p className="max-w-sm text-sm">
									Lorem ipsum dolor sit amet, consecetur adipiscing
									elit, sed do eiusmod tempor.
								</p>
							</div>
						</div>
						divider
						<div className="flex items-center gap-6">
							<span className="rounded-full border border-yellow p-4 shadow-lg transition-colors hover:bg-yellow hover:text-black">
								camera icon
							</span>
							<div className="space-y-2">
								<h3 className="text-xl font-bold">Watch Everywhere.</h3>
								<p className="max-w-sm text-sm">
									Lorem ipsum dolor sit amet, consecetur adipiscing
									elit, sed do eiusmod tempor.
								</p>
							</div>
						</div>
					</div>
				</MaxwidthWrapper>
			</section>

			{/* Top Rated Movies */}
			<section>
				<MaxwidthWrapper className="my-8 md:my-24">
					<p className="text-center text-sm font-bold text-yellow">
						ONLINE STREAMING
					</p>
					<h3 className="mb-8 text-center text-xl font-bold md:text-3xl">
						Top Rated Movies
					</h3>
					<div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
						{res?.movies?.slice(6).map((movie) => (
							<MovieCard key={movie?._id} movie={movie} />
						))}
					</div>
				</MaxwidthWrapper>
			</section>

			{/* Live Movie & TV Shows For Friends & Family section. */}

			<section className="my-24 bg-white text-black">
				<MaxwidthWrapper className="my-8 items-center gap-16 space-y-4 md:my-16 lg:flex">
					<div className="space-y-3">
						<strong className="flex items-center gap-2">
							<p className="h-1 w-12 rounded-xl bg-yellow" /> Our
							Services
						</strong>
						<h3 className="text-3xl font-bold md:text-4xl">
							Live Movie & TV Shows For Friends & Family
						</h3>
						<p>
							Get the latest movies and shows in your phone. Watch
							offline.
						</p>
						button
					</div>

					<Image
						src="/live_img.png"
						height={545}
						width={510}
						className="h-[580px] basis-1/2 object-contain"
						alt="services image "
					/>
				</MaxwidthWrapper>
			</section>
		</main>
	);
}
