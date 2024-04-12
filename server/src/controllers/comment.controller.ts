import { dbHandler } from "../utils/dbHandler";
import { Comment } from "../models/comment.model";
import { isValidObjectId } from "mongoose";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { Movie } from "../models/movie.model";

const addCommentOnMovie = dbHandler(async (req, res) => {
  const { id } = req.params; // movie ID
  const { text, email, name } = req.body;

  if (!isValidObjectId(id) || !text || !email || !name)
    return res
      .status(400)
      .json(new ApiError(400, "Invalid movie ID or missing fields"));

  const comment = await Comment.create({ text, email, movie_id: id, name });

  if (!comment)
    return res.status(500).json(new ApiError(500, "Failed to create comment"));

  const movie = await Movie.findByIdAndUpdate(id, {
    $inc: { num_mflix_comments: 1 },
  });

  if (!movie) {
    await Comment.findByIdAndDelete(comment._id);

    return res
      .status(500)
      .json(new ApiError(500, "Failed to update movie comments"));
  }

  res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added sucessfully"));
});

const updatedCommentById = dbHandler(async (req, res) => {
  const { id } = req.params; // comment ID
  const { text } = req.body;

  if (!isValidObjectId(id) || !text)
    return res
      .status(400)
      .json(new ApiError(400, "Invalid comment ID or missing fields"));

  const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true });

  if (!comment)
    return res.status(500).json(new ApiError(500, "Failed to update comment"));

  res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated sucessfully"));
});

const getCommentsByMovieId = dbHandler(async (req, res) => {
  const { id } = req.params; // movie ID
  if (!isValidObjectId(id))
    return res.status(400).json(new ApiError(400, "Invalid movie ID"));

  const comments = await Comment.find({ movie_id: id }).sort({
    date: -1,
  });

  if (!comments)
    return res.status(500).json(new ApiError(500, "Failed to fetch comments"));

  if (!comments.length)
    return res.status(404).json(new ApiError(404, "No comments found"));

  res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched sucessfully"));
});

const deleteCommentById = dbHandler(async (req, res) => {
  const { id } = req.params; // comment ID
  if (!isValidObjectId(id))
    return res.status(400).json(new ApiError(400, "Invalid comment ID"));

  const comment = await Comment.findByIdAndDelete(id);

  if (!comment)
    return res.status(500).json(new ApiError(500, "Failed to delete comment"));

  const movie = await Movie.findByIdAndUpdate(comment.movie_id, {
    $inc: { num_mflix_comments: -1 },
  });

  if (!movie)
    return res
      .status(500)
      .json(new ApiError(500, "Failed to update movie comments"));

  res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment deleted sucessfully"));
});

export {
  addCommentOnMovie,
  getCommentsByMovieId,
  updatedCommentById,
  deleteCommentById,
};
