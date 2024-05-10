import { Success } from "./axios-response";

export interface IContactResponse extends Success {
	data: {
		name: string;
		email: string;
		subject: string;
		message: string;
		_id: string;
		__v: number;
		statusCode: number;
	};
}
