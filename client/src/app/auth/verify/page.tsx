import { VerifyEmailButton } from "@/components/auth/VerifyEmailButton";

type Props = {
	searchParams: { token: string };
};

export const metadata = {
	title: "Verify Email",
};

export default async function page({ searchParams: { token } }: Props) {
	return (
		<main>
			<section className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-2 px-6 py-16">
				<h1>Verify you email</h1>
				<p>
					Please click in the button below to verify your email address.
				</p>

				<VerifyEmailButton token={token} />

				<p>Please note this link will expire within 24 hours</p>
			</section>
		</main>
	);
}
