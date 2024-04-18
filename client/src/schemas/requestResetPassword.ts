import z from "zod";

export const requestResetPasswordSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Email is invalid" }),
});

export type TRequestResetPasswordSchema = z.infer<
	typeof requestResetPasswordSchema
>;
