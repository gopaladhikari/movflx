import mongoose from "mongoose";
import { env } from "../conf/env";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${env.mongoUri}/sample_mflix`);
    console.log(conn.connection.host);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
    throw new Error((error as Error).message);
  }
};
