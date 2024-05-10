import { AxiosError } from "axios";

interface Error {
	statusCode: number;
	sucess: false;
	message: string;
	data: null;
	stack: string | undefined;
	error?: string;
}

interface Success {
	statusCode: number;
	message: string;
	sucess: true;
}

interface ApiError extends AxiosError<Error> {}
export { Success, ApiError };
