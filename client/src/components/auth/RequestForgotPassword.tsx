"use client";

import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { requestResetPassword } from "@/lib/users";
import { useToast } from "@/components/ui/use-toast";
import {
	TRequestResetPasswordSchema,
	requestResetPasswordSchema,
} from "@/schemas/requestResetPassword";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export function RequestForgotPassword() {
	const router = useRouter();

	const { toast } = useToast();
	const form = useForm<TRequestResetPasswordSchema>({
		resolver: zodResolver(requestResetPasswordSchema),
	});

	const onSubmit: SubmitHandler<TRequestResetPasswordSchema> = async ({
		email,
	}) => {
		const res = await requestResetPassword(email);
		if (res.ok) {
			toast({
				description: "Verification link has been sent to your email",
			});
			router.push("/");
		}
	};
	return (
		<section className="max-w-screen-sm space-y-3">
			<Form {...form}>
				<h2 className="text-3xl font-bold md:text-4xl">
					Request Forgot Password
				</h2>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="********"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>

					{form.formState.isSubmitting ? (
						<Button disabled variant="yellow" className="w-full">
							<Loader2 className="mr-2 size-4 animate-spin" />
							Please wait
						</Button>
					) : (
						<Button variant="yellow" type="submit" className="w-full">
							Submit
						</Button>
					)}
				</form>
			</Form>
		</section>
	);
}
