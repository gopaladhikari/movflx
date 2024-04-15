import { LoginForm } from "@/components/auth/LoginForm";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { env } from "@/config/env";

export const metadata = {
	title: "Login",
};

export default function page() {
	return (
		<main>
			<MaxwidthWrapper>
				<LoginForm backendUri={env.backendUrl} />
			</MaxwidthWrapper>
		</main>
	);
}
