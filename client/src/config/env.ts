import z from "zod";

const { BACKEND_URL } = process.env;

const envSchema = z.object({
  backendUrl: z.string().min(1, { message: "Backend URL is required" }),
});

const envValidation = envSchema.safeParse({
  backendUrl: BACKEND_URL,
});

if (!envValidation.success) process.exit(1);

export const env = envValidation.data;
