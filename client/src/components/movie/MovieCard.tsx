import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { IMovie } from "@/types/movie";

import { Clock, MessageCircle } from "lucide-react";
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
					<CardTitle className="line-clamp-1 flex items-center justify-between gap-4 text-lg">
						<Link href={`/movies/${movie?._id}`}>{movie?.title}</Link>
						<span className="text-base text-yellow">{movie?.year}</span>
					</CardTitle>
				</CardContent>
				<CardFooter className="flex items-center justify-end gap-6">
					<p className="flex items-center gap-2">
						<Clock size={15} color="yellow" /> {movie?.runtime}{" "}
					</p>
					<p className="flex items-center gap-2">
						<MessageCircle size={15} color="yellow" />{" "}
						{movie?.num_mflix_comments}{" "}
					</p>
				</CardFooter>
			</Card>
		);
	return null;
}
