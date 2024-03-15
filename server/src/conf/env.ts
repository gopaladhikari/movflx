const {
  PORT,
  MONGO_URI,
  CORS_ORIGIN,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
} = process.env;

export const env = {
  port: Number(PORT) || 8000,
  mongoUri: String(MONGO_URI),
  corsOrigin: String(CORS_ORIGIN),
  accessTokenSecret: String(ACCESS_TOKEN_SECRET),
  accessTokenExpiry: String(ACCESS_TOKEN_EXPIRY),
  refreshTokenSecret: String(REFRESH_TOKEN_SECRET),
  refreshTokenExpiry: String(REFRESH_TOKEN_EXPIRY),
  cloudinaryName: String(CLOUDINARY_CLOUD_NAME),
  cloudinaryApiKey: String(CLOUDINARY_API_KEY),
  cloudinarySecret: String(CLOUDINARY_SECRET_KEY),
};
