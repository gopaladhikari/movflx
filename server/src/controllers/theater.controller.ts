import { Theater } from "../models/theater.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";

const getAllTheaters = dbHandler(async (req, res) => {
	const theaters = await Theater.find();

	if (!theaters)
		return res.status(404).json(new ApiError(404, "Theaters not found"));

	res.status(200).json(new ApiResponse(200, theaters, "Theaters fetched"));
});

export { getAllTheaters };
