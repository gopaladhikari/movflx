import { ResetForgotPassword } from "@/components/auth/ResetForgotPassword";
import { MaxwidthWrapper } from "@/components/common/MaxwidthWrapper";
import { redirect } from "next/navigation";

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
				<h1 className="mt-[20%] text-center text-3xl font-bold sm:mt-[16%] md:mt-[12%] lg:mt-[10%]">
					Reset your password
				</h1>
				<ResetForgotPassword token={token} />
			</MaxwidthWrapper>
		</main>
	);
}
