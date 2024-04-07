import { HeroSection } from "@/components/Home/HeroSection";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { getMovies } from "@/lib/movies";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaComment, FaPlay } from "react-icons/fa";
import { PiTelevisionFill, PiVideoCameraFill } from "react-icons/pi";

export default async function page() {
  const movies = await getMovies(0, 16);

  return (
    <main>
      <HeroSection />

      {/* Upcoming movie section */}

      <section>
        <MaxwidthWrapper className="my-8 space-y-4 md:my-16">
          <p className="text-sm font-bold text-yellow">ONLINE STREAMING</p>
          <h3 className="text-xl font-bold md:text-3xl">Upcoming Movies</h3>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:grid-cols-4">
            {movies?.slice(0, 8).map((movie) => (
              <Card shadow="md" isPressable fullWidth key={movie?._id} as="div">
                <CardBody className="overflow-visible p-0">
                  <Link href={`/movies/${movie?._id}`}>
                    <Image
                      width={350}
                      height={350}
                      alt={`Movie poster for movie ${movie?.title}`}
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
                    {movie?.num_mflix_comments || 0}
                  </p>
                </CardFooter>
              </Card>
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

      {/* Top Rated Movies */}
      <section>
        <MaxwidthWrapper className="my-8 md:my-24">
          <p className="text-center text-sm font-bold text-yellow">
            ONLINE STREAMING
          </p>
          <h3 className="mb-8 text-center text-xl font-bold md:text-3xl">
            Top Rated Movies
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:grid-cols-4">
            {movies?.slice(8).map((movie) => (
              <Card shadow="md" isPressable fullWidth key={movie?._id} as="div">
                <CardBody className="overflow-visible p-0">
                  <Link href={`/movies/${movie?._id}`}>
                    <Image
                      width={350}
                      height={350}
                      alt={`Movie poster for movie ${movie?.title}`}
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
                    {movie?.num_mflix_comments || 0}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </MaxwidthWrapper>
      </section>

      {/* Live Movie & TV Shows For Friends & Family section. */}

      <section className="my-24 bg-white text-black">
        <MaxwidthWrapper className="my-8 items-center gap-16 space-y-4 md:my-16 lg:flex">
          <div className="space-y-3">
            <strong className="flex items-center gap-2">
              <p className="h-1 w-12 rounded-xl bg-yellow" /> Our Services
            </strong>
            <h3 className="text-3xl font-bold md:text-4xl">
              Live Movie & TV Shows For Friends & Family
            </h3>
            <p>Get the latest movies and shows in your phone. Watch offline.</p>
            <Button
              className="bg-yellow font-bold text-black shadow-xl data-[focus-visible=true]:outline-0"
              radius="full"
              size="lg"
            >
              <FaPlay size={10} /> WATCH NOW
            </Button>
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

      {/* Trial Start First 30 Days. */}

      <section className="bg-yellow">
        <MaxwidthWrapper className="grid-cols-2 space-y-3 p-6 lg:grid">
          <div className="text-black">
            <strong className="text-xl font-bold">
              Trial Start First 30 Days.
            </strong>
            <p>Enter your email to create or restart your membership.</p>
          </div>
          <form className="flex items-center">
            <Input size="lg" />
            <Button
              className="text-md bg-black font-semibold text-yellow"
              size="lg"
            >
              Get Started
            </Button>
          </form>
        </MaxwidthWrapper>
      </section>
    </main>
  );
}
