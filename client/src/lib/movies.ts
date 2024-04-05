import { instance } from "@/config/axios";
import { IMovieResponse } from "@/types/movie.types";

export const getMovies = async () => {
  try {
    const res = await instance.get<IMovieResponse>("/movies/get-all-movies");

    return res.data.data;
  } catch (error) {
    return null;
  }
};
