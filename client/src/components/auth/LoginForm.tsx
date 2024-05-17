"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/schemas/loginSchema";
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
import { toast } from "../ui/use-toast";
import { GoogleButton } from "../icons/GoogleButton";

const captchaKey = process.env.NEXT_PUBLIC_CAPTCHA_KEY;

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
			redirect: true,
			callbackUrl: "/me",
		});

		if (res?.error)
			toast({
				title: "Login failed",
				description: res?.error || "Something went wrong",
				variant: "destructive",
			});
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
								<FormLabel className="font-semibold">Password</FormLabel>
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
					<ReCAPTCHA
						sitekey={String(captchaKey)}
						onChange={(value) => {
							if (value) form.setValue("verifyHuman", value);
						}}
					/>

					{form.formState.errors.verifyHuman && (
						<div className="text-red-500">
							{form.formState.errors.verifyHuman.message}
						</div>
					)}

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
				onClick={async () => {
					await await signIn("google", {
						callbackUrl: "/me",
					});
				}}
			/>
		</section>
	);
}
