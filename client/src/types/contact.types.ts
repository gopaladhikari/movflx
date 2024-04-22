export interface IContactResponse {
	statusCode: number;
	data: {
		name: string;
		email: string;
		subject: string;
		message: string;
		_id: string;
		__v: 0;
	};
	message: string;
	sucess: boolean;
}
