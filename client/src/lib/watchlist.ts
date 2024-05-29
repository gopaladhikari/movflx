"use server";

import { instance } from "@/config/axios";
import { ApiError } from "@/types/axios-response";
import { IAddToWatchlist } from "@/types/watchlist";
import { cookies } from "next/headers";

export const addToWatchlist = async (userId: string, movieId: string) => {
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	try {
		const { data } = await instance.post<IAddToWatchlist>(
			`/watchlist/add-to-watch-list/${movieId}`,
			{
				userId,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	} catch (error) {
		const axiosError = (error as ApiError).response?.data;
		return axiosError;
	}
};
