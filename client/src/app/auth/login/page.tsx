import { LoginForm } from "@/components/auth/LoginForm";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { env } from "@/config/env";
import Image from "next/image";

export const metadata = {
	title: "Login",
};

export default function page() {
	return (
		<main>
			<MaxwidthWrapper className="mt-8 grid gap-8 md:grid-cols-2">
				<LoginForm backendUri={env.backendUrl} />
				<Image
					src="/login-banner.png"
					alt="Banner"
					width={800}
					height={500}
					className="size-full object-contain"
				/>
			</MaxwidthWrapper>
		</main>
	);
}
