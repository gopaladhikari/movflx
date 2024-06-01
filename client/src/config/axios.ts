import axios from "axios";
import { env } from "./env";

export const instance = axios.create({
  baseURL: `${env.backendUrl}/api/v1`,
  withCredentials: true,
  timeout: 5000,
  timeoutErrorMessage: "Request timed out",
});

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  withCredentials: true,
  timeout: 4000,
  timeoutErrorMessage: "Request timed out",
  headers: {
    Authorization: `Bearer ${env.tmdbAccessToken}`,
  },
});
