import { AxiosError } from "axios";

interface Error {
	statusCode: number;
	sucess: false;
	message: string;
	data: null;
	stack: string | undefined;
	error?: string;
}

export interface ApiError extends AxiosError<Error> {}
