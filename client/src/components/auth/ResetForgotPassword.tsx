"use client";

import { useRouter } from "next/navigation";

import {
	TForgotPasswordResetSchema,
	forgotPasswordResetSchema,
} from "@/schemas/resetForgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { resetForgotPassword } from "@/lib/users";
import { Input } from "../ui/input";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type Props = {
	token: string;
};

export function ResetForgotPassword({ token }: Props) {
	const router = useRouter();

	const { toast } = useToast();
	const form = useForm<TForgotPasswordResetSchema>({
		resolver: zodResolver(forgotPasswordResetSchema),
	});

	const onSubmit: SubmitHandler<TForgotPasswordResetSchema> = async ({
		password,
		confirmPassword,
	}) => {
		const res = await resetForgotPassword(token, password, confirmPassword);

		if (res.ok) {
			toast({
				description: "Password has been reset",
			});
			router.push("/auth/login");
		} else {
			toast({
				variant: "destructive",
				description: res.error,
			});
		}
	};
	return (
		<section className="mx-auto max-w-screen-sm space-y-3">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">
									Password
								</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="********"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">
									Confirm Password
								</FormLabel>
								<FormControl>	
									<Input
										type="password"
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
