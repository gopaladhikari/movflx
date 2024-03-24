"use server";

import { instance } from "@/config/axios";
import { AxiosError } from "axios";

interface CustomError extends AxiosError {
  response: {
    data: {
      message: string;
    };
    status: number;
    statusText: string;
    headers: any;
    config: any;
  };
}

export const registerUser = async (formData: FormData) => {
  try {
    const res = await instance.post("/users/register", formData);
    return { data: res.data, ok: true };
  } catch (error) {
    const message = (error as CustomError).response?.data?.message || "Something went wrong";
    return { error: message, ok: false };
  }
};
