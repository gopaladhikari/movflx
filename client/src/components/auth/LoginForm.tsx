"use client";

import GoogleButton from "react-google-button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/schemas/loginSchema";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LoginForm() {
	const form = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<TLoginSchema> = async ({
		email,
		password,
	}) => {
		const res = await signIn("credentials", {
			email,
			password,
			callbackUrl: "/",
		});

		if (res?.error) form.setError("root", { message: res.error });
	};

	return (
		<section className="max-w-screen-sm space-y-3">
			<Form {...form}>
				<h2 className="text-3xl font-bold md:text-4xl">
					Hey, Welcome Back!
				</h2>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">Email</FormLabel>
								<FormControl>
									<Input placeholder="example@gmail.com" {...field} />
								</FormControl>
								<FormMessage className="text-red-500" />
							</FormItem>
						)}
					/>
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
						name="acceptTermsAndCondition"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between gap-4 space-y-0">
								<div className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel>Accept terms and conditions</FormLabel>
								</div>

								<Link
									href="/auth/request-forgot-password"
									className="text-sm hover:underline"
								>
									<i>Forgot password</i>
								</Link>
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
							Login
						</Button>
					)}
				</form>
			</Form>
			<div className="h-[2px] w-full bg-slate-300" />
			<GoogleButton
				className="!w-full"
				onClick={async () => {
					await signIn("google", { callbackUrl: "/me" });
				}}
			/>
		</section>
	);
}
