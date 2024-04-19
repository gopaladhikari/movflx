import { instance } from "@/config/axios";
import { env } from "@/config/env";
import { AxiosError } from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			type: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "example@gmail.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "********",
				},
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password)
					throw new Error("Email and password are required");

				const cookieStore = cookies();

				try {
					const res = await instance.post("/users/login", credentials);
					const { token } = res.data.data;

					instance.defaults.headers.common.Authorization = `Bearer ${token}`;

					cookieStore.set("token", token, {
						httpOnly: true,
						sameSite: "strict",
						secure: true,
						maxAge: 60 * 60 * 24 * 30,
					});
					return res.data.data.user;
				} catch (error) {
					throw new Error("Invalid credentials");
				}
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
		error: "/auth/login",
	},

	callbacks: {
		async session({ session, token }) {
			if (session?.user)
				return {
					...session,
					user: {
						...session.user,
						...token,
					},
				};

			return session;
		},
		async jwt({ token, user }) {
			if (token && user)
				return {
					...token,
					...user,
					name: `${user?.firstName} ${user?.lastName}`,
				};

			return token;
		},
	},

	events: {
		async signOut() {
			const cookieStore = cookies();

			try {
				const res = await instance.post("/users/logout");
				if (res.data) {
					cookieStore.delete("token");
					cookieStore.delete("next-auth.session-token");
					instance.defaults.headers.common.Authorization = "";
				}
				return res.data;
			} catch (error) {
				const msg = (error as AxiosError).response?.data as string;
				throw new Error(msg || "Something went wrong");
			}
		},
	},

	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30,
	},

	secret: env.nextAuthSecret,

	debug: process.env.NODE_ENV === "development",
};
