import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { getMovieById, getMovies } from "@/lib/movies";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getCommentsByMovieId } from "@/lib/comments";
import { CommentCard } from "@/components/movie/CommentCard";
import { AddComment } from "@/components/movie/AddComment";
import { MovieCard } from "@/components/movie/MovieCard";

type Params = {
	params?: { id: string };
};

export async function generateMetadata(
	{ params }: Params,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const movie = await getMovieById(params?.id);
	const previousImages = (await parent).openGraph?.images || [];

	if (!movie) return {};

	return {
		title: movie?.title || "Movflx - Online Movies & Tv Shows",
		openGraph: {
			images: [
				{
					url: movie?.poster,
					height: 350,
					width: 350,
				},
				...previousImages,
			],
		},
	};
}

export default async function page({ params }: Params) {
	const movie = await getMovieById(params?.id);

	if (!movie) return notFound();

	const res = await getMovies(24, 4);

	const comments = await getCommentsByMovieId(movie._id);

	return (
		<main>
			<section
				style={{
					background:
						"url(/movie_details_bg.jpg) center center / cover no-repeat",
				}}
			>
				<MaxwidthWrapper className="grid-cols-12 gap-6 space-y-4 py-12 md:py-16 lg:grid lg:py-20">
					<div className="col-span-3">
						<Image
							src={movie?.poster || ""}
							alt={`movie poster for ${movie?.title}`}
							width={300}
							height={450}
						/>
					</div>
					<div className="col-span-6 space-y-4">
						<h1 className="text-xl text-yellow md:text-2xl lg:text-4xl">
							{movie?.title}{" "}
						</h1>
						<p> {movie?.fullplot || movie?.plot} </p>
						<div className="flex flex-wrap items-center gap-4">
							<p className="grid h-8 w-fit place-content-center rounded-lg bg-yellow px-3 font-bold text-black">
								{movie?.rated || "N/A"}
							</p>
							<p className="grid h-8 w-fit place-content-center rounded-lg border px-4">
								HD
							</p>
							<p className="flex items-center">
								{movie?.genres?.map((genre) => genre).join(", ")}
							</p>
							{movie?.year && (
								<p className="flex items-center gap-2">
									icon
									{movie.year}
								</p>
							)}

							{movie?.year && (
								<p className="flex items-center gap-2">
									icon {movie?.runtime} min
								</p>
							)}
						</div>
						<div className="grid-cols-12 place-content-center gap-4 space-y-4 rounded-full bg-[#242C38] p-16 sm:grid sm:p-8">
							<button
								type="button"
								className="col-span-3 flex w-full flex-col items-center justify-center gap-2"
							>
								icon Share
							</button>
							<p className="col-span-5 flex w-full flex-col items-center gap-2 text-lg">
								Prime Video
								<span className="text-sm text-white/80">
									Streaming Channels
								</span>
							</p>
							button
						</div>
					</div>
					<div
						className="col-span-3 mx-auto hidden cursor-pointer items-center justify-center gap-4 rounded-lg bg-yellow p-8 font-semibold text-black lg:flex"
						style={{
							writingMode: "vertical-lr",
						}}
					>
						Download now icon
					</div>
				</MaxwidthWrapper>
			</section>

			{/* Movie info and strory line section */}

			<section>
				<MaxwidthWrapper className="my-8 space-y-4">
					<h3 className="text-xl font-bold text-yellow">Movie Info:</h3>
					<ul className="list-disc pl-4">
						<li>Full Name : {movie?.title}</li>
						<li>Duration : {movie?.runtime} min</li>
						{movie?.languages.length !== 0 && (
							<li>Languages : {movie.languages?.join(", ")}</li>
						)}
						{movie?.writers?.length > 0 && (
							<li>Writers : {movie?.writers.join(", ")}</li>
						)}
						<li>Directors : {movie?.directors?.join(", ")} min</li>
						<li>
							Imdb : {movie?.imdb?.rating} ({movie?.imdb?.votes} votes)
						</li>
						<li>
							Tomatoes : {movie?.tomatoes?.viewer.rating} (
							{movie?.tomatoes?.viewer.numReviews ?? "N/A"} votes)
						</li>
						<li>Actors : {movie?.cast?.join(", ")}</li>
					</ul>
					<h3 className="text-xl font-bold text-yellow">
						Movie Storyline
					</h3>
					<p className="text-white/80">
						{movie?.fullplot || movie?.plot}{" "}
					</p>
				</MaxwidthWrapper>
			</section>

			<section>
				<MaxwidthWrapper className="my-8 grid-cols-6 gap-12 space-y-4 py-12 md:my-16 md:grid">
					<div className="col-span-4 space-y-4">
						<strong>{movie?.num_mflix_comments || 0} Comments</strong>
						<AddComment movieId={movie?._id} />
						<div className="space-y-6 overflow-scroll max-md:max-h-96">
							{comments?.map((comment) => (
								<CommentCard key={comment._id} comment={comment} />
							)) ?? "Be the first to add comment"}
						</div>
					</div>

					{/* Upcoming movie section */}

					<aside className="col-span-2 my-8 space-y-4 py-12 md:my-16">
						<p className="text-center text-sm font-bold text-yellow">
							ONLINE STREAMING
						</p>
						<h3 className="text-center text-xl font-bold md:text-3xl">
							Upcoming Movies
						</h3>
						<div className="grid gap-8 sm:grid-cols-2 md:grid-cols-none">
							{res?.movies?.map((upComingMovie) => (
								<MovieCard
									key={upComingMovie?._id}
									movie={upComingMovie}
								/>
							))}
						</div>
					</aside>
				</MaxwidthWrapper>
			</section>
		</main>
	);
}
