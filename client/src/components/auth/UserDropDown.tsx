"use client";

type Props = {
	user: {
		_id?: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		image?: string;
		phoneNumber?: string;
	};
};

export function UserDropDown({ user }: Props) {
	return <div className="flex items-center gap-4">{JSON.stringify(user)}</div>;
}
