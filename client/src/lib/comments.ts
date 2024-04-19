"use server";

import { instance } from "@/config/axios";
import {
	AddCommentResponse,
	DeleteCommentByIdResponse,
	IResponseComments,
	UpdateCommentByIdResponse,
} from "@/types/comments.type";
import { revalidatePath } from "next/cache";

const getCommentsByMovieId = async (movieId: string) => {
	try {
		const res = await instance.get<IResponseComments>(
			`/comments/get-comment-by-movie-id/${movieId}`
		);
		return res.data.data;
	} catch (error) {
		return null;
	}
};

const addCommentOnMovie = async (
	movieId: string,
	text: string,
	email: string | undefined,
	name: string,
	commentetor_avatar: string
) => {
	try {
		const res = await instance.post<AddCommentResponse>(
			`/comments/add-comment-on-movie/${movieId}`,
			{
				text,
				email,
				name,
				commentetor_avatar,
			}
		);
		revalidatePath(`/movies/${movieId}`);
		return res.data;
	} catch (error) {
		return null;
	}
};

const updateCommentById = async (id: string, text: string) => {
	try {
		const res = await instance.patch<UpdateCommentByIdResponse>(
			`/comments/update-comment-by-id/${id}`,
			{ text }
		);
		const movieId = res.data.data.movie_id;
		revalidatePath(`/movies/${movieId}`);
		return res.data;
	} catch (error) {
		return null;
	}
};

const deleteCommentById = async (id: string) => {
	try {
		const res = await instance.delete<DeleteCommentByIdResponse>(
			`/comments/delete-comment-by-id/${id}`
		);
		const movieId = res.data.data.movie_id;
		revalidatePath(`/movies/${movieId}`);
		return res.data;
	} catch (error) {
		return null;
	}
};

export {
	addCommentOnMovie,
	getCommentsByMovieId,
	updateCommentById,
	deleteCommentById,
};
