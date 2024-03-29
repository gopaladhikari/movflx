"use server";

import { instance } from "@/config/axios";
import { TLoginSchema } from "@/schemas/loginSchema";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

const cookieStore = cookies();

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
    const message =
      (error as CustomError).response?.data?.message || "Something went wrong";
    return { error: message, ok: false };
  }
};

export const loginUser = async (formData: TLoginSchema) => {
  try {
    const res = await instance.post("/users/login", formData);
    const connectSid = res.headers["set-cookie"]?.[0]
      ?.split(";")[0]
      .split("=")[1];

    if (connectSid) cookieStore.set("connect.sid", connectSid);

    return { data: res.data, ok: true };
  } catch (error) {
    const message =
      (error as CustomError).response?.data?.message ||
      "Invalid email or password";
    return { error: message, ok: false };
  }
};
export const verifyUserEmail = async (token: string) => {
  try {
    const res = await instance.post(`/users/verify-users-email?token=${token}`);

    return { data: res.data, ok: true };
  } catch (error) {
    const message =
      (error as CustomError).response?.data?.message || "Something went wrong";
    return { error: message, ok: false };
  }
};
