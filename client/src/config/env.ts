import z from "zod";

const {
  BACKEND_URL,
  NEXT_AUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CHAT_API_KEY,
} = process.env;

const envSchema = z.object({
  backendUrl: z.string().min(1, { message: "Backend URL is required" }),
  nextAuthSecret: z
    .string()
    .min(1, { message: "Next Auth secret is required" }),
  googleClientId: z
    .string()
    .min(1, { message: "Google Client ID is required" }),
  googleClientSecret: z
    .string()
    .min(1, { message: "Google Client Secret is required" }),
  googleChatApiKey: z
    .string()
    .min(1, { message: "Google Chat API Key is required" }),
});

const validatedEnv = envSchema.safeParse({
  backendUrl: BACKEND_URL,
  nextAuthSecret: NEXT_AUTH_SECRET,
  googleClientId: GOOGLE_CLIENT_ID,
  googleClientSecret: GOOGLE_CLIENT_SECRET,
  googleChatApiKey: GOOGLE_CHAT_API_KEY,
});

if (!validatedEnv.success) throw new Error(validatedEnv.error.message);

// * Ensure `env` doesn't get modified by mistakely
export const env: Readonly<typeof validatedEnv.data> = validatedEnv.data;
