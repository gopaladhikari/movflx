import { getCurrentUser } from "@/utils/session";
import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (
	_: unknown,
	parent: ResolvingMetadata
): Promise<Metadata> => {
	const session = await getCurrentUser();

	const url =
		session?.user?.avatar ||
		session?.user?.image ||
		session?.user?.picture ||
		"";

	let fullName: string = "Me";

	if (session?.user?.name) fullName = session?.user?.name;
	else if (session?.user?.firstName && session?.user?.lastName)
		fullName = `${session?.user?.firstName} ${session?.user?.lastName}`;

	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: fullName,
		description: `Profile page for the user ${fullName} on Movflx`,
		openGraph: {
			images: [
				{
					url,
					height: 350,
					width: 350,
				},
			],
			...previousImages,
		},
	};
};

export default async function page() {
	const session = await getCurrentUser();
	console.log(session);

	return <main>Me</main>;
}
