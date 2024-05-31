import { getMovieById } from "@/lib/movies";
import { getWatchlist } from "@/lib/watchlist";
import { getCurrentUser } from "@/utils/session";
import { AlignJustify, Calendar, Clock, Flag, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache, Suspense } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteFromWatchlistButton } from "@/components/watchlist/DeleteFromWatchlistButton";
import { ClearWatchlist } from "@/components/watchlist/ClearWatchlist";

export const metadata = {
  title: "Watchlist",
};

const fetchMovies = cache(async (ids: string[]) => {
  const movies = await Promise.all(
    ids.map(async (id) => {
      const movie = await getMovieById(id);
      return movie;
    })
  );

  return movies;
});

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
      <div className="flex w-full items-center justify-between">
        <strong>
          {movies.length} {movies.length === 1 ? "movie" : "movies"}
        </strong>
        <Suspense>
          <ClearWatchlist />
        </Suspense>
      </div>
      <div className="space-y-6">
        {movies?.map((movie) => (
          <div
            key={movie?._id}
            className="flex gap-4 rounded-lg bg-background-secondary p-4"
          >
            <Link href={`/movies/${movie?._id}`}>
              <Image
                src={movie?.poster || ""}
                width={100}
                height={100}
                alt={`Poster image for ${movie?.title}`}
                className="size-36 object-cover"
              />
            </Link>
            <div className="flex w-full justify-between">
              <div className="space-y-3">
                <p>
                  <strong className="text-xl">
                    <Link href={`/movies/${movie?._id}`}>
                      {movie?.title}
                    </Link>
                  </strong>
                </p>

                {movie?.year && (
                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-yellow" />
                    {movie.year}
                  </p>
                )}

                {movie?.runtime && (
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-yellow" />
                    {movie?.runtime} min
                  </p>
                )}

                {movie?.languages && movie.languages.length > 0 && (
                  <p className="flex items-center gap-2">
                    <Globe size={16} className="text-yellow" />{" "}
                    {movie?.languages}
                  </p>
                )}
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <AlignJustify />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="py-3">
                    <DropdownMenuItem>
                      <DeleteFromWatchlistButton movieId={movie?._id} />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-3">
                      <Flag size={16} />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
