import z from "zod";

const { BACKEND_URL } = process.env;

const envSchema = z.object({
  backendUrl: z.string().min(1, { message: "Backend URL is required" }),
});

const validatedEnv = envSchema.safeParse({
  backendUrl: BACKEND_URL,
});

if (!validatedEnv.success) process.exit(1);

// * Ensure `env` doesn't get modified by mistakely
export const env: Readonly<typeof validatedEnv.data> = validatedEnv.data;
