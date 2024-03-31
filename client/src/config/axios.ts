import axios from "axios";
import { cookies } from "next/headers";
import { env } from "./env";

const cookieStore = cookies();

const token = cookieStore.get("token")?.value;

export const instance = axios.create({
  baseURL: `${env.backendUrl}/api/v1`,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
