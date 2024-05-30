"use server";

import { instance } from "@/config/axios";
import { TLoginSchema } from "@/schemas/loginSchema";
import { ApiError } from "@/types/axios-response";
import { LoginWithGoogle, TUserResponse } from "@/types/user";
import { cookies } from "next/headers";

const registerUser = async (formData: FormData) => {
  try {
    const res = await instance.post("/users/register", formData);

    return { data: res.data.data, ok: true };
  } catch (error) {
    const message = (error as ApiError).response?.data.message;
    return { error: message, ok: false };
  }
};

const loginUser = async (formData: TLoginSchema) => {
  const cookieStore = cookies();
  try {
    const res = await instance.post("/users/login", formData);

    const { token } = res.data.data;

    instance.defaults.headers.common.Authorization = `Bearer ${token}`;

    cookieStore.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return { data: res.data, ok: true };
  } catch (error) {
    const message = (error as ApiError).response?.data?.message;
    return { error: message, ok: false };
  }
};

const loginWithGoogle = async (accessToken: string) => {
  try {
    const { data } = await instance.post<LoginWithGoogle>(
      "/users/login/google",
      {},
      {
        params: {
          accessToken,
        },
      }
    );

    const token = data.data.JwtToken;
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;

    const cookieStore = cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return data;
  } catch (error) {
    const axiosError = (error as ApiError).response?.data;
    return axiosError;
  }
};

const verifyUserEmail = async (token: string) => {
  try {
    const res = await instance.post(
      `/users/verify-users-email?token=${token}`
    );

    return { data: res.data, ok: true };
  } catch (error) {
    const message = (error as ApiError).response?.data.message;
    return { error: message, ok: false };
  }
};

const getMe = async () => {
  try {
    const res = await instance.get<TUserResponse>("/users/me");
    return { data: res.data.data.user, ok: true };
  } catch (error) {
    const message = (error as ApiError).response?.data;

    return { error: message, ok: false };
  }
};

const getMeFromToken = async (token: string) => {
  try {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await instance.get<TUserResponse>("/users/me");

    return res.data.data;
  } catch (error) {
    return null;
  }
};

const logoutUser = async () => {
  const cookieStore = cookies();

  try {
    const res = await instance.post("/users/logout");

    cookieStore.delete("token");

    instance.defaults.headers.common.Authorization = "";
    return { data: res.data, ok: true };
  } catch (error) {
    const message = (error as ApiError).response?.data;
    return { error: message, ok: false };
  }
};

const requestResetPassword = async (email: string) => {
  try {
    const res = await instance.post("/users/request-forgot-password", {
      email,
    });
    return { data: res.data, ok: true };
  } catch (error) {
    const message = (error as ApiError).response?.data.message;
    return { error: message, ok: false };
  }
};

const resetForgotPassword = async (
  token: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const res = await instance.post(
      `/users/reset-forgot-password?token=${token}`,
      {
        password,
        confirmPassword,
      }
    );
    return { data: res.data, ok: true };
  } catch (error) {
    const message = (error as ApiError).response?.data.message;
    return { error: message, ok: false };
  }
};

export {
  registerUser,
  requestResetPassword,
  resetForgotPassword,
  loginUser,
  loginWithGoogle,
  verifyUserEmail,
  getMe,
  getMeFromToken,
  logoutUser,
};
