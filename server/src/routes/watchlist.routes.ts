import { Router } from "express";
import {
	getWatchlist,
	addToWatchlist,
	deleteFromWatchlist,
	deleteWatchlist,
} from "../controllers/watchlist.controller";
import passport from "passport";

const watchlistRouter = Router();

// private routes

watchlistRouter
	.route("/get-watch-list")
	.get(passport.authenticate("jwt", { session: false }), getWatchlist);

watchlistRouter
	.route("/add-to-watch-list/:movieId")
	.post(passport.authenticate("jwt", { session: false }), addToWatchlist);

watchlistRouter
	.route("/delete-from-watch-list/:movieId")
	.delete(
		passport.authenticate("jwt", { session: false }),
		deleteFromWatchlist
	);

watchlistRouter
	.route("/clear-watchlist")
	.post(passport.authenticate("jwt", { session: false }), deleteWatchlist);

export { watchlistRouter };
