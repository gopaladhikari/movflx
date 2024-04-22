import z from "zod";

export const contactSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid email" }),
	subject: z.string().min(1, { message: "Subject is required" }),
	message: z.string().min(1, "Message is required"),
});

export type TContactSchema = z.infer<typeof contactSchema>;
