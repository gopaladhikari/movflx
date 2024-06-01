import { ApiError } from "@/types/axios-response";
import { instance } from "@/config/axios";

const toggleLike = async (movieId: string, userId: string) => {
  try {
    const { data } = await instance.post(`/likes/toggle-like/${movieId}`, {
      userId,
    });

    return data;
  } catch (error) {
    const axiosError = (error as ApiError).response?.data;
    return axiosError;
  }
};

const getLikedMovies = async (userId: string) => {
  try {
    const { data } = await instance.get(`/api/v1/likes/get-liked-movies`, {
      data: { userId },
    });

    return data;
  } catch (error) {
    const axiosError = (error as ApiError).response?.data;
    return axiosError;
  }
};

export { toggleLike, getLikedMovies };
