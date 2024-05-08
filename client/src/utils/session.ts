import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";

import { getServerSession } from "next-auth";

// Use it in server contexts
export function getCurrentUser() {
	return getServerSession(nextAuthOptions);
}
