import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";

import { getServerSession } from "next-auth";

export function getCurrentUser() {
	return getServerSession(nextAuthOptions);
}
