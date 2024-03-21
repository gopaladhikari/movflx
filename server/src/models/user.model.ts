import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../conf/env";
import { TUser } from "../types";

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

		refreshToken: {
			type: String,
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

userSchema.methods.generateAccessToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
		},
		env.accessTokenSecret,
		{
			expiresIn: env.accessTokenExpiry,
		}
	);
	return token;
};

userSchema.methods.generateRefreshToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
		},
		env.accessTokenSecret,
		{
			expiresIn: env.accessTokenExpiry,
		}
	);
	return token;
};

userSchema.methods.comparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

export const User = model<TUser>("User", userSchema);
