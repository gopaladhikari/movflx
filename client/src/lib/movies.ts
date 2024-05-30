import { instance } from "@/config/axios";
import { IMovieResponse, IMoviesResponse } from "@/types/movie";
import { cache } from "react";

const getMovies = cache(async (skip = 0, limit = 8) => {
  try {
    const res = await instance.get<IMoviesResponse>(
      `/movies/get-all-movies?skip=${skip}&limit=${limit}`
    );

    const { movies } = res.data.data;
    const { totalMovies } = res.data.data;

    return { movies, totalMovies };
  } catch (error) {
    return null;
  }
});

const getMovieById = cache(async (id: string | undefined) => {
  if (!id) return null;

  try {
    const res = await instance.get<IMovieResponse>(
      `/movies/get-movie-by-id/${id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
});

export { getMovies, getMovieById };
