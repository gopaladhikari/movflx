import z from "zod";

const { BACKEND_URL, GOOGLE_CLIENT_ID } = process.env;

const envSchema = z.object({
	backendUrl: z.string().min(1, { message: "Backend URL is required" }),
	googleClientId: z
		.string()
		.min(1, { message: "Google Client ID is required" }),
});

const validatedEnv = envSchema.safeParse({
	backendUrl: BACKEND_URL,
	googleClientId: GOOGLE_CLIENT_ID,
});

if (!validatedEnv.success) throw new Error("Invalid environment variables");

// * Ensure `env` doesn't get modified by mistakely
export const env: Readonly<typeof validatedEnv.data> = validatedEnv.data;
