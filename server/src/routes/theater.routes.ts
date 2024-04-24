import { Router } from "express";
import { getAllTheaters } from "../controllers/theater.controller";

const theaterRouter = Router();

// public routes

theaterRouter.route("/get-all-theaters").get(getAllTheaters);

export { theaterRouter };
