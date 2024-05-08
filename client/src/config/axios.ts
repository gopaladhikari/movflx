import axios from "axios";
import { env } from "./env";

export const instance = axios.create({
	baseURL: `${env.backendUrl}/api/v1`,
	withCredentials: true,
	timeout: 4000,
	timeoutErrorMessage: "Request timed out",
});
