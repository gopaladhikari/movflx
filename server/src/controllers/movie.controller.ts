import { isValidObjectId } from "mongoose";
import { Movie } from "../models/movie.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";

const getAllMovies = dbHandler(async (req, res) => {
  const { skip = 0, limit = 8 } = req.query;

  if (isNaN(+skip) || isNaN(+limit))
    return res.status(400).json(new ApiError(400, "Invalid query"));

  const movies = await Movie.aggregate([
    {
      $facet: {
        movies: [
          {
            $skip: Number(skip),
          },
          {
            $limit: Number(limit),
          },
          {
            $project: {
              title: 1,
              year: 1,
              runtime: 1,
              poster: 1,
              num_mflix_comments: 1,
            },
          },
        ],
        count: [
          {
            $count: "totalMovies",
          },
        ],
      },
    },
    {
      $project: {
        movies: 1,
        totalMovies: { $arrayElemAt: ["$count.totalMovies", 0] },
      },
    },
  ]);

  if (!movies?.length)
    return res.status(404).json(new ApiError(404, "Movies not found"));

  res.status(200).json(new ApiResponse(200, movies[0], "Movies fetched"));
});

const getMovieById = dbHandler(async (req, res) => {
  const { id } = req.params; // Movie ID

  if (!isValidObjectId(id))
    return res.status(400).json(new ApiError(400, "Invalid movie ID"));

  const movie = await Movie.findById(id);

  if (!movie)
    return res.status(404).json(new ApiError(404, "Movie not found"));

  res.status(200).json(new ApiResponse(200, movie, "Movie fetched"));
});

export { getAllMovies, getMovieById };
