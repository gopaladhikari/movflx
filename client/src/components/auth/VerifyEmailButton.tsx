"use client";

import { verifyUserEmail } from "@/lib/users";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export async function VerifyEmailButton({ token }: { token: string }) {
	const { toast } = useToast();
	const router = useRouter();
	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const handleClick = async () => {
		const res = await verifyUserEmail(token);

		if (res.ok) {
			toast({
				title: "Email Verified",
				description: "Your email has been verified",
				duration: 3000,
			});
			router.push("/auth/login");
		} else {
			toast({
				variant: "destructive",
				title: "Error",
				description: res.error,
				duration: 3000,
			});
			router.push("/auth/register");
		}
	};
	return (
		<form onSubmit={handleSubmit(handleClick)}>
			{isSubmitting ? (
				<Button disabled variant="yellow" className="w-full">
					<Loader2 className="mr-2 size-4 animate-spin" />
					Please wait
				</Button>
			) : (
				<Button variant="yellow" className="w-full" type="submit">
					Verify Email
				</Button>
			)}
		</form>
	);
}
