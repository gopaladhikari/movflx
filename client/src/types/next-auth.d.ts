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
