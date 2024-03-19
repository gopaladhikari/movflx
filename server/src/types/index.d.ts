import { InferSchemaType, Document, ObjectId } from "mongoose";
import { userSchema } from "../models/user.model";

export type TUser = InferSchemaType<typeof userSchema> & {
  _id: ObjectId;
};
