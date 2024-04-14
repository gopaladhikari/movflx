import z from "zod";

export const registerSchemas = z.object({
	firstName: z.string().min(1, { message: "First name is required" }),
	lastName: z.string().min(1, { message: "Last name is required" }),
	email: z.string().min(1, { message: "Email is required" }).email(),
	password: z.string().min(1, { message: "Required" }),
	avatar: z
		.any()
		.refine((file) => file?.length !== 0, { message: "Avatar is required" }),

	phoneNumber: z.string().min(1, { message: "Phone number is required" }),
});

export type TRegisterSchema = z.infer<typeof registerSchemas>;
