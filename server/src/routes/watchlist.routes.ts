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

watchlistRouter.get(
	"/get-watch-list",
	passport.authenticate("jwt", { session: false }),
	getWatchlist
);

watchlistRouter.post(
	"/add-to-watch-list/:movieId",
	passport.authenticate("jwt", { session: false }),
	addToWatchlist
);

watchlistRouter.delete(
	"/delete-from-watch-list/:movieId",
	passport.authenticate("jwt", { session: false }),
	deleteFromWatchlist
);

watchlistRouter.delete(
	"/",
	passport.authenticate("jwt", { session: false }),
	deleteWatchlist
);

export { watchlistRouter };
