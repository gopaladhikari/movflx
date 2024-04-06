import { HeroSection } from "@/components/Home/HeroSection";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { getMovies } from "@/lib/movies";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaComment } from "react-icons/fa";
import { PiTelevisionFill, PiVideoCameraFill } from "react-icons/pi";

export default async function page() {
  const movies = await getMovies();

  return (
    <main>
      <HeroSection />

      <section>
        <MaxwidthWrapper className="my-8 space-y-4 md:my-16">
          <p className="text-sm font-bold text-yellow">ONLINE STREAMING</p>
          <h3 className="text-xl font-bold md:text-3xl">Upcoming Movies</h3>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:grid-cols-4">
            {movies?.map((movie) => (
              <Card shadow="md" isPressable fullWidth key={movie?._id} as="div">
                <CardBody className="overflow-visible p-0">
                  <Link href={`/movies/${movie?._id}`}>
                    <Image
                      width={350}
                      height={350}
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
        </MaxwidthWrapper>
      </section>

      <section className="my-24 bg-black py-8">
        <MaxwidthWrapper className="my-8 items-center gap-16 space-y-4 md:my-16 lg:flex">
          <Image
            src="/services_img.jpg"
            height={545}
            width={510}
            className="h-[580px] basis-1/2 object-contain"
            placeholder="blur"
            alt="services image "
          />
          <div className="space-y-3">
            <strong className="flex items-center gap-2">
              <p className="h-1 w-12 rounded-xl bg-yellow" /> Our Services
            </strong>
            <h3 className="text-3xl font-bold md:text-4xl">
              Download Your Shows Watch Offline.
            </h3>
            <p>Get the latest movies and shows in your phone. Watch offline.</p>

            <div className="flex items-center gap-6">
              <span className="rounded-full border border-yellow p-4 shadow-lg transition-colors hover:bg-yellow hover:text-black">
                <PiTelevisionFill size={40} />
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Enjoy on Your TV.</h3>
                <p className="max-w-sm text-sm">
                  Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do
                  eiusmod tempor.
                </p>
              </div>
            </div>
            <Divider className="!my-8" />
            <div className="flex items-center gap-6">
              <span className="rounded-full border border-yellow p-4 shadow-lg transition-colors hover:bg-yellow hover:text-black">
                <PiVideoCameraFill size={40} />
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Watch Everywhere.</h3>
                <p className="max-w-sm text-sm">
                  Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do
                  eiusmod tempor.
                </p>
              </div>
            </div>
          </div>
        </MaxwidthWrapper>
      </section>
    </main>
  );
}
