import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { MoviepageHeroSection } from "@/components/movie/HeroSection";
import { MovieCard } from "@/components/movie/MovieCard";
import { getMovies } from "@/lib/movies";

export const metadata = {
	title: "Movies",
};

type SearchParams = {
	searchParams?: {
		page: string;
	};
};

export default async function page({ searchParams }: SearchParams) {
	const currentPage = Number(searchParams?.page) || 1;

	const skip = (currentPage - 1) * 16;

	const res = await getMovies(skip, 16);

	return (
		<main>
			<MoviepageHeroSection>
				<div className="grid h-[70vh] place-content-center space-y-2">
					<h2 className="text-xl font-bold md:text-3xl lg:text-5xl">
						Our <span className="text-yellow">Movie</span>
					</h2>
					<div className="flex h-5 items-center justify-center space-x-4">
						<strong className="text-yellow">Blog</strong>
						<strong>Movie</strong>
					</div>
				</div>
			</MoviepageHeroSection>

			<section>
				<MaxwidthWrapper className="my-8 space-y-4 md:my-16">
					<p className="text-sm font-bold text-yellow">ONLINE STREAMING</p>
					<h3 className="text-xl font-bold md:text-3xl">
						Upcoming Movies
					</h3>
					<div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
						{res?.movies?.map((movie) => (
							<MovieCard key={movie._id} movie={movie} />
						))}
					</div>
				</MaxwidthWrapper>
			</section>
		</main>
	);
}
