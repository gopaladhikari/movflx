import { Schema, model, InferSchemaType, ObjectId } from "mongoose";
import bcrypt from "bcrypt";

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
      required: true,
    },

    email: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    avatar: {
      type: String,
      required: true,
    },

    coverImage: {
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

    passwordResetToken: {
      type: String,
    },

    passwordResetTokenExpiry: {
      type: Date,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

type TUser = InferSchemaType<typeof userSchema> & {
  _id: ObjectId;
  generateJwtToken(): string;
  comparePassword(password: string): Promise<boolean>;
};

export const User = model<TUser>("User", userSchema);
