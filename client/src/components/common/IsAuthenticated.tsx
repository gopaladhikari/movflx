"use client";

import { TUserResponse } from "@/types/user";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const backendUri = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Props {
	token: string | undefined;
}

export function IsAuthenticated({ token }: Props) {
	useEffect(() => {
		const getMe = async () => {
			try {
				const { data } = await axios.get<TUserResponse>(
					`${backendUri}/api/v1/users/me`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!data.sucess) await signOut();
			} catch (error) {
				console.error(error);
			}
		};

		getMe();
	}, [token]);

	return null;
}
