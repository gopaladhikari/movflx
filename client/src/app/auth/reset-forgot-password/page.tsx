import { ResetForgotPassword } from "@/components/auth/ResetForgotPassword";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Request Forgot Password",
};

type SeachParams = {
	searchParams?: {
		token?: string;
	};
};

export default function page({ searchParams }: SeachParams) {
	const token = searchParams?.token;

	if (!token) redirect("/auth/request-forgot-password");

	return (
		<main>
			<MaxwidthWrapper>
				<h1 className="text-center">Reset your password</h1>
				<ResetForgotPassword token={token} />
			</MaxwidthWrapper>
		</main>
	);
}
