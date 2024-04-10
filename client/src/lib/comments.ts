"use server";

import { instance } from "@/config/axios";
import { AddCommentResponse, IResponseComments } from "@/types/comments.type";
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
  name: string
) => {
  try {
    const res = await instance.post<AddCommentResponse>(
      `/comments/add-comment-on-movie/${movieId}`,
      {
        text,
        email,
        name,
      }
    );
    revalidatePath(`/movies/${movieId}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

const updatedCommentById = async () => {};

const deleteCommentById = async () => {};

export {
  addCommentOnMovie,
  getCommentsByMovieId,
  updatedCommentById,
  deleteCommentById,
};
