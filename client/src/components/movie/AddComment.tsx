"use client";

// import { addCommentOnMovie } from "@/lib/comments";
// import { TTextSchema, textSchema } from "@/schemas/updateCommentSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SubmitHandler, useForm } from "react-hook-form";

// type Props = {
// 	avatar: string | undefined;
// 	movieId: string;
// 	name: string;
// 	email: string | undefined;
// };

export function AddComment() {
	// const {
	// 	handleSubmit,
	// 	register,
	// 	reset,
	// 	formState: { errors, isSubmitting },
	// } = useForm<TTextSchema>({
	// 	resolver: zodResolver(textSchema),
	// });

	// const onSubmit: SubmitHandler<TTextSchema> = async ({ text }) => {
	// 	const res = await addCommentOnMovie(movieId, text, email, name);
	// 	if (res?.data) reset();
	// };

	return (
		<div className="flex items-start gap-4 py-6">
			{/* <form
				className="flex w-full flex-col gap-3"
				onSubmit={handleSubmit(() => {})}
			>
				{errors.text && (
					<p className="text-sm text-red-500">{errors.text.message}</p>
				)}
			</form> */}
		</div>
	);
}
