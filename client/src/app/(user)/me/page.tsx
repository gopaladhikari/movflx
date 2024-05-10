import { getCurrentUser } from "@/utils/session";
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
	const session = await getCurrentUser();

	let fullName: string = "Me";

	if (session?.user?.name) fullName = session?.user?.name;
	else if (session?.user?.firstName && session?.user?.lastName)
		fullName = `${session?.user?.firstName} ${session?.user?.lastName}`;

	return {
		title: fullName,
		description: `Profile page for the user ${fullName} on Movflx`,
	};
};

export default async function page() {
	return <main>Me</main>;
}
