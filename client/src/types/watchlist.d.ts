import { Success } from "./axios-response";

export interface IAddToWatchlist extends Success {
	data: {
		_id: string;
		user_id: string;
		movie_id: string[];
		createdAt: Date;
		updatedAt: Date;
		__v: 2;
	};
}
