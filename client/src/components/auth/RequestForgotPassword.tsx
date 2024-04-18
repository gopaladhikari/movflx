// "use client";

// import { requestResetPassword } from "@/lib/users";
// import { RxCross1 } from "react-icons/rx";
// import {
// 	TForgotPasswordSchema,
// 	requestForgotPasswordSchema,
// } from "@/schemas/forgotPasswordSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button, Input } from "@nextui-org/react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { MdOutlineDone } from "react-icons/md";
// import { useState } from "react";

// export function RequestForgotPassword() {
// 	const [message, setMessage] = useState("");
// 	const {
// 		register,
// 		handleSubmit,
// 		setError,
// 		formState: { errors, isSubmitting },
// 	} = useForm<TForgotPasswordSchema>({
// 		resolver: zodResolver(requestForgotPasswordSchema),
// 	});

// 	const onSubmit: SubmitHandler<TForgotPasswordSchema> = async ({ email }) => {
// 		const res = await requestResetPassword(email);

// 		if (res.error) setError("root", { message: res.error });
// 		else setMessage(res.data.message);
// 	};
// 	return (
// 		<form
// 			className="mx-auto max-w-md space-y-5 py-16"
// 			onSubmit={handleSubmit(onSubmit)}
// 		>
// 			<label
// 				htmlFor="email"
// 				className="mb-2 block text-sm font-medium  focus:border-b-primary "
// 			>
// 				Email
// 			</label>
// 			<Input
// 				type="email"
// 				variant="underlined"
// 				id="email"
// 				placeholder="example@example.com"
// 				disabled={isSubmitting}
// 				{...register("email")}
// 			/>

// 			{errors.email && (
// 				<p className="p-1 text-red-600">{errors.email?.message}</p>
// 			)}
// 			<Button
// 				radius="full"
// 				fullWidth
// 				type="submit"
// 				className="bg-yellow text-lg font-semibold text-black"
// 				isLoading={isSubmitting}
// 				disabled={isSubmitting}
// 			>
// 				{isSubmitting ? "Loading" : "Submit"}
// 			</Button>
// 			{message && (
// 				<p className="ml-1 mt-2 flex items-center gap-2 bg-emerald-100 px-4 py-2 text-emerald-700 ">
// 					<MdOutlineDone size={20} />
// 					{message}
// 				</p>
// 			)}

// 			{errors?.root && (
// 				<p className="ml-1 mt-2 flex items-center gap-2 bg-red-100 px-4 py-2 text-red-700 ">
// 					<RxCross1 size={20} />
// 					{errors?.root?.message}
// 				</p>
// 			)}
// 		</form>
// 	);
// }

export function RequestForgotPassword() {
	return <div>RequestForgotPassword</div>;
}
