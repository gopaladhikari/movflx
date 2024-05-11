import z from "zod";

const {
	PORT,
	MONGO_URI,
	CORS_ORIGIN,
	JWT_SECRET,
	JWT_SECRET_EXPIRY,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_SECRET_KEY,
	BACKEND_URI,
	FROM,
	DOMAIN,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	ESEWA_SECRET_KEY,
	ESEWA_GATEWAY_URL,
	ESEWA_PRODUCT_CODE,
} = process.env;

const envSchema = z.object({
	port: z
		.string()
		.min(1, { message: "Port number is required" })
		.default("8000"),
	mongoUri: z.string().min(1, { message: "Mongo URI is required" }),
	corsOrigin: z.string().min(1, { message: "CORS origin is required" }),
	jwtSecret: z.string().min(1, { message: "JWT secret is required" }),
	jwtSecretExpiry: z
		.string()
		.min(1, { message: "JWT secret expiry is required" }),
	cloudinaryName: z
		.string()
		.min(1, { message: "Cloudinary cloud name is required" }),
	cloudinaryApiKey: z
		.string()
		.min(1, { message: "Cloudinary API key is required" }),
	cloudinarySecret: z
		.string()
		.min(1, { message: "Cloudinary secret key is required" }),

	from: z.string().min(1, { message: "From email is required" }),
	domain: z.string().min(1, { message: "Domain is required" }),
	googleClientId: z
		.string()
		.min(1, { message: "Google client ID is required" }),
	googleClientSecret: z
		.string()
		.min(1, { message: "Google client secret is required" }),
	bakendUri: z.string().min(1, { message: "Backend URL is required" }),
	esewaSecretKey: z
		.string()
		.min(1, { message: "Esewa secret key is required" }),
	esewaGatewayUrl: z
		.string()
		.min(1, { message: "Esewa gateway URL is required" }),
	esewaProductCode: z
		.string()
		.min(1, { message: "Esewa product code is required" }),
});

const validatedEnv = envSchema.safeParse({
	port: PORT,
	mongoUri: MONGO_URI,
	corsOrigin: CORS_ORIGIN,
	jwtSecret: JWT_SECRET,
	jwtSecretExpiry: JWT_SECRET_EXPIRY,
	cloudinaryName: CLOUDINARY_CLOUD_NAME,
	cloudinaryApiKey: CLOUDINARY_API_KEY,
	cloudinarySecret: CLOUDINARY_SECRET_KEY,
	from: FROM,
	domain: DOMAIN,
	googleClientId: GOOGLE_CLIENT_ID,
	googleClientSecret: GOOGLE_CLIENT_SECRET,
	bakendUri: BACKEND_URI,
	esewaSecretKey: ESEWA_SECRET_KEY,
	esewaGatewayUrl: ESEWA_GATEWAY_URL,
	esewaProductCode: ESEWA_PRODUCT_CODE,
});

if (!validatedEnv.success) throw new Error(validatedEnv.error.message);

// * Ensure `env` doesn't get modified by mistakely
export const env: Readonly<typeof validatedEnv.data> = validatedEnv.data;
