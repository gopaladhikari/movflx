import { Router } from "express";
import {
  addCommentOnMovie,
  deleteCommentById,
  getCommentsByMovieId,
  updatedCommentById,
} from "../controllers/comment.controller";

const commentRouter = Router();

commentRouter.route("/add-comment-on-movie/:id").post(addCommentOnMovie);
commentRouter.route("/get-comment-by-movie-id/:id").get(getCommentsByMovieId);
commentRouter.route("/update-comment-by-id/:id").post(updatedCommentById);
commentRouter.route("/delete-comment-by-id/:id").delete(deleteCommentById);

export { commentRouter };
