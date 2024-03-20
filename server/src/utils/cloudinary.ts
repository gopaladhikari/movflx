import { v2 as cloudinary } from "cloudinary";
import { env } from "../conf/env";
import fs from "fs";

cloudinary.config({
  cloud_name: env.cloudinaryName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinarySecret,
});

export const uploadOnCloudinary = (filePath: string) => {
  try {
    const result = cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
  }
};
