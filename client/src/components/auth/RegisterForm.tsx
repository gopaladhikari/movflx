// "use client";

// // import { TRegisterSchema, registerSchemas } from "@/schemas/registerSchema";
// // import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// // import { SubmitHandler, useForm } from "react-hook-form";
// // import PhoneInput from "react-phone-input-2";
// // import { useState } from "react";
// import "react-phone-input-2/lib/style.css";
// import "@/styles/react-phone-input.css";
// // import { registerUser } from "@/lib/users";
// // import { useRouter } from "next/navigation";
// // import { EyeFilledIcon } from "../icons/EyeFilledIcon";
// // import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";

// export function RegisterForm() {
// 	// const [success, setSuccess] = useState(false);
// 	// const [isVisible, setIsVisible] = useState(false);

// 	// const toggleVisibility = () => setIsVisible(!isVisible);

// 	// const router = useRouter();

// 	// const {
// 	// 	register,
// 	// 	handleSubmit,
// 	// 	setError,
// 	// 	reset,
// 	// 	setValue,
// 	// 	formState: { errors, isSubmitting },
// 	// } = useForm<TRegisterSchema>({
// 	// 	resolver: zodResolver(registerSchemas),
// 	// });

// 	// const onSubmit: SubmitHandler<TRegisterSchema> = async (data) => {
// 	// 	const formData = new FormData();

// 	// 	Object.entries(data).forEach(([key, value]) => {
// 	// 		if (value instanceof FileList) formData.append(key, value[0]);
// 	// 		else formData.append(key, value);
// 	// 	});

// 	// const res = await registerUser(formData);

// 	// 	if (!res.ok) {
// 	// 		setError("root", { message: res.error });
// 	// 		setSuccess(false);
// 	// 	} else {
// 	// 		reset();
// 	// 		setSuccess(true);
// 	// 		setTimeout(() => router.push("/"), 3000);
// 	// 	}
// 	// };

// 	return (
// 		<form className="mx-auto max-w-md space-y-5 py-16" onSubmit={() => {}}>
// 			form
// 			{success && (
// 				<div className="flex items-center gap-3 bg-emerald-100 p-2 text-emerald-800">
// 					icon Email verification link sent to your gmail
// 				</div>
// 			)}
// 			{/* {errors.root && (
// 					<div className="flex items-center gap-4 bg-red-100 p-2 text-red-800">
// 						icon{errors.root.message}
// 					</div>
// 				)} */}
// 			<p className="font-normal">
// 				Already have an account?&nbsp;
// 				<Link href="/login" className="font-medium">
// 					<span className="text-blue-700 underline">Login here</span>
// 				</Link>
// 			</p>
// 			bnt
// 		</form>
// 	);
// }

export function RegisterForm() {
	return <div>RegisterForm</div>;
}
