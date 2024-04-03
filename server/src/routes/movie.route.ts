import { Router } from "express";
import { getAllMovies } from "../controllers/movie.controller";

const movieRouter = Router();

movieRouter.route("/get-all-movies").get(getAllMovies);

export { movieRouter };
