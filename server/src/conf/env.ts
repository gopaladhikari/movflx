const {
  PORT,
  MONGO_URI,
  CORS_ORIGIN,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  USER,
  PASS,
  FROM,
  DOMAIN,
} = process.env;

export const env = {
  port: Number(PORT) || 8000,
  mongoUri: String(MONGO_URI),
  corsOrigin: String(CORS_ORIGIN),
  jwtSecret: String(JWT_SECRET),
  cloudinaryName: String(CLOUDINARY_CLOUD_NAME),
  cloudinaryApiKey: String(CLOUDINARY_API_KEY),
  cloudinarySecret: String(CLOUDINARY_SECRET_KEY),
  user: String(USER),
  pass: String(PASS),
  from: String(FROM),
  domain: String(DOMAIN),
};
