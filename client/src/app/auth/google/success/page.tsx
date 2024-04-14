import { GoogleRedirect } from "@/components/auth/GoogleRedirect";
import { getMeFromToken } from "@/lib/users";

import { redirect } from "next/navigation";

type SearchParams = {
	searchParams?: {
		token?: string;
	};
};

export default async function page({ searchParams }: SearchParams) {
	const token = searchParams?.token;

	if (!token) redirect("/auth/login");

	const me = await getMeFromToken(token);

	if (!me) redirect("/auth/login");

	return (
		<main>
			<GoogleRedirect />
		</main>
	);
}
