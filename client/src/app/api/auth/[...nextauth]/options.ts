import { instance } from "@/config/axios";
import { env } from "@/config/env";
import { AxiosError } from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import GoogleProvider from "next-auth/providers/google";
import { loginWithGoogle } from "@/lib/users";

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
		GoogleProvider({
			clientId: env.googleClientId,
			clientSecret: env.googleClientSecret,
		}),
	],
	pages: {
		signIn: "/auth/login",
	},

	callbacks: {
		async signIn({ account }) {
			if (account?.provider === "credentials") return true;

			if (account?.provider === "google") {
				const accessToken = account.access_token;
				if (!accessToken) return false;

				try {
					const response = await loginWithGoogle(accessToken);

					if (response?.sucess) return true;

					return true;
				} catch (error) {
					return false;
				}
			}

			return false;
		},
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
			return {
				...token,
				...user,
			};
		},
	},

	events: {
		async signOut() {
			const cookieStore = cookies();

			try {
				const res = await instance.post("/users/logout");

				if (res.data.sucess) {
					cookieStore.delete("token");
					delete instance.defaults.headers.common.Authorization;
					return res.data;
				}
				return false;
			} catch (error) {
				return (error as AxiosError).message;
			}
		},
	},

	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30,
	},

	jwt: {
		maxAge: 60 * 60 * 24 * 30,
	},

	secret: env.nextAuthSecret,

	debug: process.env.NODE_ENV === "development",
};
