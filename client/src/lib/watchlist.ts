"use server";

import { instance } from "@/config/axios";
import { ApiError } from "@/types/axios-response";
import { IAddToWatchlist, IWatchlist } from "@/types/watchlist";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const addToWatchlist = async (userId: string, movieId: string) => {
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

    revalidatePath("/me/watchlist");
    return data;
  } catch (error) {
    const axiosError = (error as ApiError).response?.data;
    return axiosError;
  }
};

const getWatchlist = async (userId: string) => {
  try {
    const { data } = await instance.get<IWatchlist>(
      "/watchlist/get-watch-list",
      {
        data: { userId },
      }
    );

    return data;
  } catch (error) {
    const axiosError = (error as ApiError).response?.data;
    return axiosError;
  }
};

export { addToWatchlist, getWatchlist };
