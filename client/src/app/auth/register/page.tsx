import { RegisterForm } from "@/components/auth/RegisterForm";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";

export const metadata = {
	title: "Register",
};

export default function page() {
	return (
		<main>
			<MaxwidthWrapper>
				<h1>Register</h1>
				<RegisterForm />
			</MaxwidthWrapper>
		</main>
	);
}
