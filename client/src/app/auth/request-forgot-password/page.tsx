import { RequestForgotPassword } from "@/components/auth/RequestForgotPassword";

export default function page() {
	return (
		<main className="flex flex-col items-center justify-center gap-2">
			<RequestForgotPassword />
		</main>
	);
}
