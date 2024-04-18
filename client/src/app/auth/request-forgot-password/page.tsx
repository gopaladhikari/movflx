import { RequestForgotPassword } from "@/components/auth/RequestForgotPassword";

export const metadata = {
	title: "Request Forgot Password",
};

export default function page() {
	return (
		<main className="flex flex-col items-center justify-center gap-2">
			<RequestForgotPassword />
		</main>
	);
}
