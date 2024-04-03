import { Movie } from "../models/movie.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";

const getAllMovies = dbHandler(async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;

  if (isNaN(+skip) || isNaN(+limit))
    return res.status(400).json(new ApiError(400, "Invalid query"));

  const movies = await Movie.aggregate([
    {
      $skip: Number(skip),
    },
    {
      $limit: Number(limit),
    },
    {
      $project: {
        _id: 1,
        title: 1,
        year: 1,
        runtime: 1,
      },
    },
  ]);

  if (!movies?.length)
    return res.status(404).json(new ApiError(404, "Movies not found"));

  res.status(200).json(new ApiResponse(200, { movies }, "Movies fetched"));
});

export { getAllMovies };
