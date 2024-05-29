import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { MoviepageHeroSection } from "@/components/movie/HeroSection";
import { MovieCard } from "@/components/movie/MovieCard";
import { getMovies } from "@/lib/movies";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Movies",
};

type SearchParams = {
	searchParams?: {
		page: string;
	};
};

export default async function Page({ searchParams }: SearchParams) {
	const currentPage = searchParams?.page;
	if (!currentPage || +currentPage < 1) return redirect("/movies?page=1");

	const skip = +currentPage * 16 - 16;
	const res = await getMovies(skip, 16);

	const totalPages = Math.floor(Number(res?.totalMovies) / 16);

	return (
		<>
			<MoviepageHeroSection>
				<div className="grid h-[70vh] place-content-center space-y-2">
					<h1>
						Our <span className="text-yellow">Movie</span>
					</h1>
					<div className="flex h-5 items-center justify-center space-x-4">
						<strong className="text-yellow">Blog</strong>
						<strong>Movie</strong>
					</div>
				</div>
			</MoviepageHeroSection>

			{res?.totalMovies && (
				<section>
					<MaxwidthWrapper className="my-8 space-y-4 md:my-16">
						<p className="text-sm font-bold text-yellow">
							ONLINE STREAMING
						</p>
						<h3 className="text-xl font-bold md:text-3xl">
							Upcoming Movies
						</h3>
						<div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
							{res?.movies?.map((movie) => (
								<MovieCard key={movie._id} movie={movie} />
							))}
						</div>
						<Pagination className="mt-8">
							<PaginationContent>
								{+currentPage > 1 && (
									<PaginationItem>
										<PaginationPrevious
											href={`/movies?page=${+currentPage - 1}`}
										/>
									</PaginationItem>
								)}

								{+currentPage > 4 && (
									<PaginationItem>
										<PaginationLink href="/movies?page=1">
											1
										</PaginationLink>
									</PaginationItem>
								)}
								{+currentPage > 5 && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}
								{Array.from(
									{ length: Math.min(7, totalPages) },
									(_, i) => i + +currentPage - 3
								).map((page) =>
									page >= 1 && page <= totalPages ? (
										<PaginationItem key={page}>
											<PaginationLink href={`/movies?page=${page}`}>
												{page}
											</PaginationLink>
										</PaginationItem>
									) : null
								)}

								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
								<PaginationLink href={`/movies?page=${totalPages}`}>
									{totalPages}
								</PaginationLink>

								<PaginationItem>
									<PaginationNext
										href={`/movies?page=${+currentPage + 1}`}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</MaxwidthWrapper>
				</section>
			)}
		</>
	);
}
