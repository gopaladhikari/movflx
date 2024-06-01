import { Router } from "express";
import passport from "passport";
import { toggleLike } from "../controllers/like.controller";

const likeRouter = Router();

likeRouter
  .route("/toggle-like/:movieId")
  .post(passport.authenticate("jwt", { session: false }), toggleLike);

likeRouter
  .route("/get-liked-movies")
  .get(passport.authenticate("jwt", { session: false }), toggleLike);

export { likeRouter };
