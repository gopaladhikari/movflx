import { dbHandler } from "../utils/dbHandler";
import { Comment } from "../models/comment.model";
import { isValidObjectId } from "mongoose";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

const addCommentOnMovie = dbHandler(async (req, res) => {
  const { id } = req.params; // movie ID
  const { text, email } = req.body;

  if (!isValidObjectId(id) || !text || !email)
    return res
      .status(400)
      .json(new ApiError(400, "Invalid movie ID or missing fields"));

  const comment = await Comment.create({ text, email, movie_id: id });

  if (!comment)
    return res.status(500).json(new ApiError(500, "Failed to add comment"));

  res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added sucessfully"));
});

const updatedCommentById = dbHandler(async (req, res) => {
  const { id } = req.params; // comment ID

  if (!isValidObjectId(id))
    return res.status(400).json(new ApiError(400, "Invalid comment ID"));

  const { text } = req.body;

  if (!text) return res.status(400).json(new ApiError(400, "Text is required"));

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

  const comments = await Comment.find({ movie_id: id });

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

  res.status(200).json(new ApiResponse(200, {}, "Comment deleted sucessfully"));
});

export {
  addCommentOnMovie,
  getCommentsByMovieId,
  updatedCommentById,
  deleteCommentById,
};
