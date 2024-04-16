"use client";

import GoogleButton from "react-google-button";
import { Input, Button } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/schemas/loginSchema";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";

export function LoginForm({ backendUri }: { backendUri: string }) {
	const router = useRouter();

	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const {
		handleSubmit,
		register,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TLoginSchema>({
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

		if (res?.error) setError("root", { message: res.error });
	};

	return (
		<section>
			<form
				className="mx-auto mt-12 max-w-md space-y-6"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-center text-3xl font-bold">Sign in</h1>
				<div>
					<label
						htmlFor="email"
						className="mb-2 block text-sm font-medium  focus:border-b-primary "
					>
						Email
					</label>
					<Input
						type="email"
						variant="underlined"
						id="email"
						placeholder="example@example.com"
						disabled={isSubmitting}
						{...register("email")}
					/>

					{errors.email && (
						<p className="p-1 text-red-600">{errors.email?.message}</p>
					)}
				</div>
				<div>
					<label
						htmlFor="password"
						className="mb-2 block text-sm font-medium  focus:border-b-primary "
					>
						Password
					</label>

					<Input
						variant="underlined"
						id="password"
						placeholder="********"
						disabled={isSubmitting}
						endContent={
							<button
								className="focus:outline-none"
								type="button"
								onClick={toggleVisibility}
							>
								{isVisible ? (
									<EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
								) : (
									<EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
								)}
							</button>
						}
						type={isVisible ? "text" : "password"}
						{...register("password")}
					/>
					{errors.password && (
						<p className="p-1 text-red-600">{errors.password?.message}</p>
					)}
				</div>

				{errors.root && (
					<p className="flex items-center gap-4 bg-red-100 p-2 text-red-800">
						<ImCross size={18} /> {errors.root.message}
					</p>
				)}

				<div className="flex items-start">
					<Link
						href="/auth/request-forgot-password"
						className="text-[13px] italic underline"
					>
						Forgot Password
					</Link>
				</div>

				<p className="text-center text-base font-medium">
					Don&rsquo;t have an account?&nbsp;
					<Link className="text-blue-700 underline" href="/auth/register">
						Sign up
					</Link>
				</p>

				<Button
					type="submit"
					radius="full"
					fullWidth
					isLoading={isSubmitting}
					className="bg-yellow text-lg font-semibold text-black"
				>
					{isSubmitting ? "Loading..." : "Login"}
				</Button>
				<GoogleButton
					className="!w-full"
					onClick={() =>
						router.replace(`${backendUri}/api/v1/users/auth/google`)
					}
				/>
			</form>
		</section>
	);
}
