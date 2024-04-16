"use client";

import { Button, Input } from "@nextui-org/react";
import { ImCross } from "react-icons/im";
import {
	TForgotPasswordResetSchema,
	forgotPasswordResetSchema,
} from "@/schemas/resetForgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { resetForgotPassword } from "@/lib/users";
import { useRouter } from "next/navigation";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";

type Props = {
	token: string;
};

export function ResetForgotPassword({ token }: Props) {
	const router = useRouter();
	const [isVisiblePassowrd, setIsVisiblePassowrd] = useState(false);
	const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
		useState(false);

	const {
		handleSubmit,
		register,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<TForgotPasswordResetSchema>({
		resolver: zodResolver(forgotPasswordResetSchema),
	});

	const onSubmit: SubmitHandler<TForgotPasswordResetSchema> = async ({
		confirmPassword,
		password,
	}) => {
		const res = await resetForgotPassword(token, password, confirmPassword);
		if (res?.ok) router.push("/auth/login");
		setError("root", { message: res?.error });
	};
	return (
		<form
			className="mx-auto mt-12 max-w-md space-y-6"
			onSubmit={handleSubmit(onSubmit)}
		>
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
					type={isVisiblePassowrd ? "text" : "password"}
					endContent={
						<button
							className="focus:outline-none"
							type="button"
							onClick={() => setIsVisiblePassowrd(!isVisiblePassowrd)}
						>
							{isVisiblePassowrd ? (
								<EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
							) : (
								<EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
							)}
						</button>
					}
					placeholder="example@example.com"
					disabled={isSubmitting}
					{...register("password")}
				/>

				{errors.password && (
					<p className="p-1 text-red-600">{errors.password?.message}</p>
				)}
			</div>
			<div>
				<label
					htmlFor="confirmPassword"
					className="mb-2 block text-sm font-medium  focus:border-b-primary "
				>
					Confirm Password
				</label>

				<Input
					variant="underlined"
					id="confirmPassword"
					placeholder="********"
					disabled={isSubmitting}
					endContent={
						<button
							className="focus:outline-none"
							type="button"
							onClick={() =>
								setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
							}
						>
							{isVisibleConfirmPassword ? (
								<EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
							) : (
								<EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
							)}
						</button>
					}
					type={isVisibleConfirmPassword ? "text" : "password"}
					{...register("confirmPassword")}
				/>
				{errors.confirmPassword && (
					<p className="p-1 text-red-600">
						{errors.confirmPassword?.message}
					</p>
				)}
			</div>

			{errors.root && (
				<p className="flex items-center gap-4 bg-red-100 p-2 text-red-800">
					<ImCross size={18} /> {errors.root.message}
				</p>
			)}

			<Button
				type="submit"
				radius="full"
				fullWidth
				isLoading={isSubmitting}
				className="bg-yellow text-lg font-semibold text-black"
			>
				{isSubmitting ? "Loading..." : "Submit"}
			</Button>
		</form>
	);
}
