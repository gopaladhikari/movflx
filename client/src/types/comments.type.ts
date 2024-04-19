export interface IComment {
	_id: string;
	name: string;
	email: string;
	movie_id: string;
	text: string;
	commentetor_avatar: string;
	date: string;
}

export interface IResponseComments {
	data: IComment[];
	sucess: boolean;
	statusCode: number;
	message: string;
}

export interface AddCommentResponse {
	statusCode: number;
	data: {
		email: string;
		movie_id: string;
		commentetor_avatar: string;
		name: string;
		text: string;
		date: string;
		_id: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
	};
	message: string;
	sucess: boolean;
}

export interface DeleteCommentByIdResponse {
	statusCode: number;
	data: {
		_id: string;
		name: string;
		email: string;
		movie_id: string;
		text: string;
		date: string;
	};
	message: string;
	sucess: boolean;
}

export interface UpdateCommentByIdResponse {
	statusCode: number;
	data: {
		_id: string;
		email: string;
		movie_id: string;
		name: string;
		text: string;
		date: string;
		createdAt: string;
		updatedAt: string;
		__v: null;
	};
	message: string;
	sucess: boolean;
}
