import z from "zod";

export const requestForgotPasswordSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
});

export type TForgotPasswordSchema = z.infer<typeof requestForgotPasswordSchema>;
