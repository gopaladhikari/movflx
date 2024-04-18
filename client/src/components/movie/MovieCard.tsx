import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import Link from "next/link";

export function MovieCard({ movie }: { movie: IMovie }) {
	if (movie?.poster)
		return (
			<Card className="rounded-md">
				<CardHeader>
					<Link href={`/movies/${movie?._id}`}>
						<Image
							src={movie?.poster}
							alt={movie?.title}
							width={400}
							height={300}
							className="h-80 w-full object-cover"
						/>
					</Link>
				</CardHeader>
				<CardContent>
					<CardTitle className="flex items-center justify-between gap-4">
						<Link href={`/movies/${movie?._id}`}>{movie?.title}</Link>
						<span className="text-base text-yellow">{movie?.year}</span>
					</CardTitle>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">Cancel</Button>
					<Button>Deploy</Button>
				</CardFooter>
			</Card>
		);
	return null;
}
