import z from "zod";

export const forgotPasswordResetSchema = z
	.object({
		password: z.string().min(1, { message: "Password is required" }),
		confirmPassword: z
			.string()
			.min(1, { message: "Confirm password is required" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type TForgotPasswordResetSchema = z.infer<
	typeof forgotPasswordResetSchema
>;
