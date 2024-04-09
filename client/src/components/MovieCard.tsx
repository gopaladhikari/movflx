import { IMovie } from "@/types/movie.types";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaComment } from "react-icons/fa";

interface IMovieCardProps {
  movie: IMovie;
}

export default function MovieCard({ movie }: IMovieCardProps) {
  return (
    <Card shadow="md" isPressable fullWidth key={movie?._id} as="div">
      <CardBody className="overflow-visible p-0">
        <Link href={`/movies/${movie?._id}`}>
          <Image
            width={350}
            height={350}
            alt={`Movie poster for movie ${movie?.title}`}
            className="h-[350px] w-full object-cover"
            src={movie?.poster || ""}
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
          <FaClock className="text-yellow" /> {movie?.runtime} min
        </p>
        <p className="flex items-center gap-2">
          <FaComment className="text-yellow" />
          {movie?.num_mflix_comments || 0}
        </p>
      </CardFooter>
    </Card>
  );
}
