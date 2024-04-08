import { instance } from "@/config/axios";
import { IMovieResponse } from "@/types/movie.types";
import { cache } from "react";

export const getMovies = cache(async (skip = 0, limit = 8) => {
  try {
    const res = await instance.get<IMovieResponse>(
      `/movies/get-all-movies?skip=${skip}&limit=${limit}`
    );

    const { movies } = res.data.data;
    const { totalMovies } = res.data.data;

    return { movies, totalMovies };
  } catch (error) {
    return null;
  }
});
