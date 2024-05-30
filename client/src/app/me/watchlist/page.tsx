import { MovieCard } from "@/components/movie/MovieCard";
import { getMovieById } from "@/lib/movies";
import { getWatchlist } from "@/lib/watchlist";
import { IMovie } from "@/types/movie";
import { getCurrentUser } from "@/utils/session";
import { redirect } from "next/navigation";

const fetchMovies = async (ids: string[]) => {
	const movies = await Promise.all(
		ids.map(async (id) => {
			const movie = await getMovieById(id);
			return movie;
		})
	);

	return movies;
};

export default async function page() {
	const session = await getCurrentUser();
	const userId = session?.user?._id;

	if (!userId) redirect("/auth/login");

	const watchlist = await getWatchlist(userId);

	const movieIds = watchlist?.data?.movie_id;

	if (!movieIds || movieIds.length === 0)
		return (
			<section className="grid h-[90%] place-content-center text-center">
				<h1>Watchlist</h1>
				<p className="text-lg text-gray-200">No videos in watch list</p>
			</section>
		);

	const movies = await fetchMovies(movieIds);

	return (
		<section className="space-y-3">
			<h1>Watch list</h1>
			<div className="grid gap-6 md:grid-cols-2">
				{movies?.map((movie) => (
					<MovieCard key={movie?._id} movie={movie as IMovie} />
				))}
			</div>
		</section>
	);
}
