"use server";

import { instance } from "@/config/axios";
import { TLoginSchema } from "@/schemas/loginSchema";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

interface CustomError extends AxiosError {
  response: {
    data: {
      message: string;
    };
    message: string;
    status: number;
    statusText: string;
    headers: any;
    config: any;
  };
}

export const registerUser = async (formData: FormData) => {
  try {
    const res = await instance.post("/users/register", formData);

    return { data: res.data.data, ok: true };
  } catch (error) {
    const message =
      (error as CustomError).response?.data.message || "Something went wrong";
    return { error: message, ok: false };
  }
};

export const loginUser = async (formData: TLoginSchema) => {
  const cookieStore = cookies();
  try {
    const res = await instance.post("/users/login", formData);
    const { token } = res.data.data;

    cookieStore.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return { data: res.data, ok: true };
  } catch (error) {
    const message =
      (error as CustomError).response?.data?.message || "Something went wrong";
    return { error: message, ok: false };
  }
};
export const verifyUserEmail = async (token: string) => {
  try {
    const res = await instance.post(`/users/verify-users-email?token=${token}`);

    return { data: res.data, ok: true };
  } catch (error) {
    const message =
      (error as CustomError).response?.data.message || "Something went wrong";
    return { error: message, ok: false };
  }
};

export const getMe = async () => {
  try {
    const res = await instance.get("/users/me");
    return { data: res.data.data, ok: true };
  } catch (error) {
    const message =
      (error as CustomError).response?.data || "Something went wrong";
    return { error: message, ok: false };
  }
};
export const logoutUser = async () => {
  const cookieStore = cookies();

  try {
    const res = await instance.get("/users/logout");

    cookieStore.delete("token");

    return { data: res.data, ok: true };
  } catch (error) {
    const message =
      (error as CustomError).response?.data || "Something went wrong";
    return { error: message, ok: false };
  }
};
