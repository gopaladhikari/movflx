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
