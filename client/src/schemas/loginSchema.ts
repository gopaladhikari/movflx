import z from "zod";

const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Email is invalid" }),
	password: z.string().min(1, { message: "Password is required" }),
	verifyHuman: z.string().min(1, { message: "Required" }),
});

type TLoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, type TLoginSchema };
