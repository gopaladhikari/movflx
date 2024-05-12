import { Router } from "express";
import passport from "passport";
import {
	addCommentOnMovie,
	deleteCommentById,
	getCommentsByMovieId,
	updatedCommentById,
} from "../controllers/comment.controller";

const commentRouter = Router();

// public routes
commentRouter
	.route("/get-comment-by-movie-id/:id")
	.get(getCommentsByMovieId);

// protected routes
commentRouter
	.route("/add-comment-on-movie/:id")
	.post(
		passport.authenticate("jwt", { session: false }),
		addCommentOnMovie
	);

commentRouter
	.route("/update-comment-by-id/:id")
	.patch(
		passport.authenticate("jwt", { session: false }),
		updatedCommentById
	);

commentRouter
	.route("/delete-comment-by-id/:id")
	.delete(
		passport.authenticate("jwt", { session: false }),
		deleteCommentById
	);

export { commentRouter };
