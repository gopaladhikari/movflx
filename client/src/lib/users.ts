"use server";

import { instance } from "@/config/axios";

export const registerUser = async (data: any) => {
  try {
    const res = await instance.post("/users/register", data);
    console.log("res: ", res);

    return res;
  } catch (error) {
    return error.response.data;
  }
};
