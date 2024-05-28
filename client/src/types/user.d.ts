import { Success } from "./axios-response";

export type TUser = {
	_id: string;
	firstName: string;
	lastName: string;
	password: string;
	email: string;
	avatar: string;
	coverImage: string;
	phoneNumber: string;
	isEmailVerified: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export interface TUserResponse extends Success {
	data: {
		user: TUser;
	};
}

interface LoginWithGoogle extends Success {
	data: {
		_id: string;
		firstName: string;
		lastName: string;
		email: string;
		avatar: string;
		isEmailVerified: boolean;
		createdAt: Date;
		updatedAt: Date;
		__v: 0;
		JwtToken: string;
	};
}
