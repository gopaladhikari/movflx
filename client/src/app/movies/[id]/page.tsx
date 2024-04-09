import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { getMovieById } from "@/lib/movies";
import { Metadata, ResolvingMetadata } from "next";

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
      images: [movie?.poster, ...previousImages],
    },
  };
}

export default async function page({ params }: Params) {
  const movie = await getMovieById(params?.id);
  return (
    <main>
      <section>
        <MaxwidthWrapper>{JSON.stringify(movie, null, 2)}</MaxwidthWrapper>
      </section>
    </main>
  );
}
