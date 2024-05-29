import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { site } from "@/config/site";
import { getCurrentUser } from "@/utils/session";
import { User } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default async function layout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await getCurrentUser();

	let fullName: string = "Me";

	if (session?.user?.name) fullName = session?.user?.name;
	else if (session?.user?.firstName && session?.user?.lastName)
		fullName = `${session?.user?.firstName} ${session?.user?.lastName}`;

	return (
		<MaxwidthWrapper className="mb-16 grid min-h-[90vh] grid-cols-12 gap-4">
			<aside className="col-span-3 rounded-xl bg-background-secondary">
				<nav>
					<menu className="flex flex-col gap-3 p-3">
						<li>
							<Link
								href="/me"
								className="flex items-center gap-4 rounded-md p-3 hover:bg-black"
							>
								<User size={18} />
								{fullName}
							</Link>
						</li>
						{site.userNav.map(({ id, href, title, Icon }) => (
							<li key={id}>
								<Link
									href={href}
									className="flex items-center gap-4 rounded-md p-3 hover:bg-black"
								>
									<Icon size={18} /> {title}
								</Link>
							</li>
						))}
					</menu>
				</nav>
			</aside>
			<div className="col-span-9">{children}</div>
		</MaxwidthWrapper>
	);
}
