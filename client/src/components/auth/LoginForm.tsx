"use client";

import { Input, Button } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/schemas/loginSchema";
import { ImCross } from "react-icons/im";
import { loginUser } from "@/lib/users";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";

const backendUri = process.env.NEXT_PUBLIC_BACKEND_URL;

export function LoginForm() {
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

	const onSubmit: SubmitHandler<TLoginSchema> = async (formData) => {
		const res = await loginUser(formData);

		if (!res.ok) setError("root", { message: res.error });
		else router.back();
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
					<div className="flex items-center gap-4 bg-red-100 p-2 text-red-800">
						<ImCross size={18} /> {errors.root.message}
					</div>
				)}

				<Button
					type="submit"
					radius="full"
					fullWidth
					isLoading={isSubmitting}
					className="bg-yellow text-lg font-semibold text-black"
				>
					{isSubmitting ? "Loading..." : "Login"}
				</Button>
			</form>
			<Button
				type="button"
				onClick={() =>
					router.replace(`${backendUri}/api/v1/users/auth/google`)
				}
			>
				Login with google
			</Button>
		</section>
	);
}
