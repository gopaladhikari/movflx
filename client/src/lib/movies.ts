import { instance } from "@/config/axios";
import { IMovieResponse } from "@/types/movie.types";
import { cache } from "react";

export const getMovies = cache(async () => {
  try {
    const res = await instance.get<IMovieResponse>("/movies/get-all-movies");

    return res.data.data;
  } catch (error) {
    return null;
  }
});
