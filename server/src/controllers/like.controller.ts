import { dbHandler } from "../utils/dbHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Like } from "../models/likes.model";
import mongoose, { isValidObjectId } from "mongoose";

const toggleLike = dbHandler(async (req, res) => {
  const { userId } = req.body;
  const { movieId } = req.params;

  if (!isValidObjectId(userId) || !isValidObjectId(movieId))
    return res
      .status(400)
      .json(new ApiError(400, "Invalid userId or movieId"));

  const like = await Like.findOne({ user_id: userId });

  if (!like) {
    const newLike = await Like.create({
      movie_id: movieId,
      user_id: userId,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newLike, "Liked video"));
  }

  const movieObjectId = new mongoose.Types.ObjectId(movieId);

  if (like.movie_id.includes(new mongoose.Types.ObjectId(movieId))) {
    const index = like.movie_id.indexOf(movieObjectId);

    like.movie_id.splice(index, 1);
    await like.save();

    return res
      .status(200)
      .json(new ApiResponse(200, like, "Like removed"));
  }

  like.movie_id.push(movieObjectId);
  await like.save();

  return res.status(200).json(new ApiResponse(200, like, "Liked movie"));
});

const getLikedMovies = dbHandler(async (req, res) => {
  const { userId } = req.body;

  if (!isValidObjectId(userId))
    return res.status(400).json(new ApiError(400, "Invalid userId"));

  const likedMovies = await Like.find({ user_id: userId });

  if (!likedMovies)
    return res
      .status(404)
      .json(new ApiError(404, "No liked movies found"));

  return res
    .status(200)
    .json(new ApiResponse(200, likedMovies, "Liked movies"));
});

export { toggleLike, getLikedMovies };
