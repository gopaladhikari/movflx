import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";

// Use it in server contexts
export function getCurrentUser(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, nextAuthOptions);
}
