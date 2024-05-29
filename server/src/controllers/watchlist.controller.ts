import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";
import { Movie } from "../models/movie.model";
import { Watchlist } from "../models/watchlist.model";

const getWatchlist = dbHandler(async (req, res) => {
	const { userId } = req.body;

	if (!isValidObjectId(userId))
		return res.status(400).json(new ApiError(400, "Invalid id"));

	const watchlist = await Watchlist.findOne({ user_id: userId });

	if (!watchlist)
		return res.status(404).json(new ApiError(404, "Watchlist not found"));

	res
		.status(200)
		.json(
			new ApiResponse(200, Watchlist, "Watchlist fetched sucessfully")
		);
});

const addToWatchlist = dbHandler(async (req, res) => {
	const { userId } = req.body;
	const { movieId } = req.params;

	if (!isValidObjectId(movieId) || !isValidObjectId(userId))
		return res.status(400).json(new ApiError(400, "Invalid id"));

	const watchlist = await Watchlist.findOne({ user_id: userId });

	if (!watchlist) {
		const newWatchList = await Watchlist.create({
			user_id: userId,
			movie_id: movieId,
		});

		return res
			.status(201)
			.json(new ApiResponse(201, newWatchList, "Watch list created"));
	}

	if (watchlist.movie_id.includes(new mongoose.Types.ObjectId(movieId)))
		return res
			.status(409)
			.json(new ApiError(409, "Movie is already in wacth list"));

	watchlist.movie_id.push(new mongoose.Types.ObjectId(movieId));
	await watchlist.save();

	res
		.status(200)
		.json(
			new ApiResponse(200, watchlist, "Watchlist updated sucessfully")
		);
});

const deleteFromWatchlist = dbHandler(async (req, res) => {
	const { userId } = req.body;
	const { movieId } = req.params;

	if (!isValidObjectId(userId) || !isValidObjectId(movieId))
		return res.status(400).json(new ApiError(400, "Invalid id"));

	const watchlist = await Watchlist.findOne({ user_id: userId });

	if (!watchlist)
		return res.status(404).json(new ApiError(404, "Watchlist not found"));

	const movie = await Movie.findById(movieId);

	if (!movie)
		return res.status(404).json(new ApiError(404, "Movie not found"));

	const index = watchlist.movie_id.indexOf(
		new mongoose.Types.ObjectId(movieId)
	);

	if (index === -1)
		return res.status(404).json(new ApiError(404, "Movie not found"));

	watchlist.movie_id.splice(index, 1);
	await watchlist.save();

	res
		.status(200)
		.json(
			new ApiResponse(200, watchlist, "Watchlist updated sucessfully")
		);
});

const deleteWatchlist = dbHandler(async (req, res) => {
	const { userId } = req.body;

	if (!isValidObjectId(userId))
		return res.status(400).json(new ApiError(400, "Invalid id"));

	const watchlist = await Watchlist.findOneAndDelete({ user_id: userId });

	if (!watchlist)
		return res.status(404).json(new ApiError(404, "Watchlist not found"));

	res
		.status(200)
		.json(new ApiResponse(200, null, "Watchlist deleted sucessfully"));
});

export {
	getWatchlist,
	addToWatchlist,
	deleteFromWatchlist,
	deleteWatchlist,
};
