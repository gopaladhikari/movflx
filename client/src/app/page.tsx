import { HeroSection } from "@/components/Home/HeroSection";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { getMovies } from "@/lib/movies";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import { FaClock, FaComment } from "react-icons/fa";

export default async function page() {
  const movies = await getMovies();

  return (
    <main>
      <HeroSection />

      <MaxwidthWrapper>
        <section className="my-8 space-y-4 md:my-16">
          <p className="text-sm font-bold text-yellow">ONLINE STREAMING</p>
          <h3 className="text-xl font-bold md:text-3xl">Upcoming Movies</h3>
          <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-12 lg:grid-cols-4">
            {movies?.map((movie) => (
              <Card shadow="md" isPressable fullWidth key={movie?._id} as="div">
                <CardBody className="overflow-visible p-0">
                  <Link href={`/movies/${movie?._id}`}>
                    <Image
                      shadow="md"
                      radius="lg"
                      width="100%"
                      alt={movie?.title}
                      className="h-[350px] w-full object-cover"
                      src={movie?.poster}
                    />
                  </Link>
                </CardBody>
                <CardFooter className="justify-between text-small">
                  <Link href={`/movies/${movie?._id}`}>
                    <strong className="line-clamp-1 pr-8 text-medium">
                      {movie?.title}
                    </strong>
                  </Link>
                  <p className="font-semibold text-yellow">{movie.year}</p>
                </CardFooter>
                <CardFooter className="justify-end gap-3 text-small">
                  <p className="flex items-center gap-2">
                    <FaClock color="yellow" /> {movie?.runtime} min
                  </p>
                  <p className="flex items-center gap-2">
                    <FaComment color="yellow" />
                    {movie?.movie_comments?.length || 0}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </MaxwidthWrapper>
    </main>
  );
}
