import z from "zod";

const { BACKEND_URL, NEXT_AUTH_SECRET } = process.env;

const envSchema = z.object({
	backendUrl: z.string().min(1, { message: "Backend URL is required" }),
	nextAuthSecret: z
		.string()
		.min(1, { message: "Next Auth secret is required" }),
});

const validatedEnv = envSchema.safeParse({
	backendUrl: BACKEND_URL,
	nextAuthSecret: NEXT_AUTH_SECRET,
});

if (!validatedEnv.success) throw new Error(validatedEnv.error.message);

// * Ensure `env` doesn't get modified by mistakely
export const env: Readonly<typeof validatedEnv.data> = validatedEnv.data;
