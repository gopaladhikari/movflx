import { Success } from "./axios-response";

export interface IMovie {
	_id: string;
	runtime: number;
	title: string;
	year: number;
	num_mflix_comments: number;
	poster: string;
}

export interface IMoviesResponse extends Success {
	data: {
		movies: IMovie[];
		totalMovies: number;
	};
}

export interface IMovieResponse extends Success {
	data: {
		plot: string;
		genres: string[];

		cast: string[];
		fullplot: string;
		languages: string[];
		released: string;
		directors: string[];
		rated: string;
		writers: string[];
		awards: {
			wins: number;
			nominations: number;
			text: string;
		};
		lastupdated: string;
		imdb: {
			rating: number;
			votes: number;
			id: number;
		};
		countries: string[];
		type: string;
		tomatoes: {
			viewer: {
				rating: number;
				numReviews: number;
				meter: number;
			};
			fresh: number;
			critic: {
				rating: number;
				numReviews: number;
				meter: number;
			};
			rotten: number;
			lastUpdated: string;
		};
	} & IMovie;
}
