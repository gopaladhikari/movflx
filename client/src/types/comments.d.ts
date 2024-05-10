import { Success } from "./axios-response";

export interface Comment {
	_id: string;
	name: string;
	email: string;
	movie_id: string;
	text: string;
	commentetor_avatar: string;
	date: Date;
}

export interface ICommentsResponse extends Success {
	data: IComment;
}

export interface IMovieCommentsResponse extends Success {
	data: IComment[];
}
