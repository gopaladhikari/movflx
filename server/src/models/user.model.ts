import { Schema, model, InferSchemaType, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../conf/env";

export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    avatar: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationTokenExpiry: {
      type: Date,
    },

    forgotPasswordToken: {
      type: String,
    },

    forgotPasswordTokenExpiry: {
      type: Date,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    JwtToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateJwtToken = function () {
  const token = jwt.sign({ _id: this._id }, env.jwtSecret, {
    expiresIn: "30d",
  });
  return token;
};

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export interface IUser
  extends Document,
    InferSchemaType<typeof userSchema> {
  generateJwtToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends IUser {}
  }
}

export const User = model<IUser>("User", userSchema);
