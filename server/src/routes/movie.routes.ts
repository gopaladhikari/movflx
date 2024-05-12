import { Router } from "express";
import {
	getAllMovies,
	getMovieById,
} from "../controllers/movie.controller";

const movieRouter = Router();

movieRouter.route("/get-all-movies").get(getAllMovies);
movieRouter.route("/get-movie-by-id/:id").get(getMovieById);

export { movieRouter };
