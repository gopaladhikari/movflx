import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user?: {
			_id?: string;
			firstName?: string;
			lastName?: string;
			email?: string;
			avatar?: string;
			phoneNumber?: string;
			image?: string;
			fullName?: string;
			picture?: string;
		} & DefaultSession["user"];
	}

	interface User {
		_id?: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		avatar?: string;
		phoneNumber?: string;
	}

	interface Profile {
		given_name?: string;
		family_name?: string;
		picture?: string;
		email?: string;
		email_verified?: boolean;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		_id?: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		avatar?: string;
		phoneNumber?: string;
	}
}
