import { instance } from "@/config/axios";
import { env } from "@/config/env";
import { AxiosError } from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import GoogleProvider from "next-auth/providers/google";

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
		async signIn({ account, profile }) {
			if (account?.provider === "credentials") return true;

			if (account?.provider === "google") {
				const cookieStore = cookies();

				const userData = {
					firstName: profile?.given_name,
					lastName: profile?.family_name,
					email: profile?.email,
					avatar: profile?.picture,
					isEmailVerified: profile?.email_verified,
				};

				try {
					const res = await instance.post("/users/auth/google", userData);
					const token = res?.data.data.token;
					instance.defaults.headers.common.Authorization = `Bearer ${token}`;
					cookieStore.set("token", token, {
						httpOnly: true,
						sameSite: "strict",
						secure: true,
						maxAge: 60 * 60 * 24 * 30,
					});
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
			if (token && user)
				return {
					...token,
					...user,
					fullName: `${user?.firstName} ${user?.lastName}`,
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
				console.error((error as AxiosError).response?.data);
				throw new Error((error as AxiosError).message);
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
