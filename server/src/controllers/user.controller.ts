import fs from "fs";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { dbHandler } from "../utils/dbHandler";
import { sendMail } from "../utils/sendMail";
import { sign } from "jsonwebtoken";
import { env } from "../conf/env";
import { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
	httpOnly: true,
	secure: true,
	maxAge: 60 * 60 * 24 * 30,
};

const registerUser = dbHandler(async (req, res) => {
	const { firstName, lastName, email, password, phoneNumber } = req.body;
	const avatarLocalPath = req.file?.path;

	if (
		!firstName ||
		!lastName ||
		!email ||
		!password ||
		!phoneNumber ||
		!avatarLocalPath
	)
		return res
			.status(400)
			.json(new ApiError(400, "All fields are required."));

	const existedUser = await User.findOne({ email });

	if (existedUser) {
		fs.unlinkSync(avatarLocalPath);
		return res.status(409).json(new ApiError(409, "User already exists."));
	}

	const avatar = await uploadOnCloudinary(avatarLocalPath);

	if (!avatar) {
		fs.unlinkSync(avatarLocalPath);
		return res.status(500).json(new ApiError(500, "File upload failed."));
	}

	const createdUser = await User.create({
		firstName,
		lastName,
		email,
		password,
		phoneNumber,
		avatar,
	});

	await createdUser.save({ validateBeforeSave: false });
	const user = await User.findById(createdUser?._id).select("-password");

	if (!user)
		return res.status(400).json(new ApiError(400, "User creation failed."));

	await sendMail(user.email, "verify", user._id);

	res.status(201).json(new ApiResponse(201, { user }, "User created"));
});

const loginUser = dbHandler(async (req, res) => {
	const user = req.user;

	// @ts-expect-error _id is  present in user model
	const token = sign({ _id: user?._id }, env.jwtSecret, {
		expiresIn: env.jwtSecretExpiry,
	});

	return res
		.status(200)
		.cookie("token", token, cookieOptions)
		.json(new ApiResponse(200, { user, token }, "Login sucessfull"));
});

const loginWithGoogle = dbHandler(async (req, res) => {
	const user = req.user;

	// @ts-expect-error _id is  present in user model
	const token = sign({ _id: user?._id }, env.jwtSecret, {
		expiresIn: env.jwtSecretExpiry,
	});

	res.cookie("token", token, cookieOptions);
	res.redirect(`${env.domain}/auth/google/success?token=${token}`);
});

const getMe = dbHandler(async (req, res) => {
	const user = req.user;

	if (!user) return res.status(404).json(new ApiError(404, "User not found."));

	res.status(200).json(
		new ApiResponse(200, { user }, "User fetched sucessfully")
	);
});

const logoutUser = dbHandler(async (req, res) => {
	delete req.user;

	res.status(200)
		.clearCookie("token", cookieOptions)
		.json(new ApiResponse(200, null, "Logout successful"));
});

const verifyUsersEmail = dbHandler(async (req, res) => {
	const { token } = req.query;

	const user = await User.findOne({
		emailVerificationToken: token,
		emailVerificationTokenExpiry: { $gt: Date.now() },
	});

	if (!user) return res.status(404).json(new ApiError(404, "User not found."));

	user.isEmailVerified = true;
	user.emailVerificationToken = undefined;
	user.emailVerificationTokenExpiry = undefined;
	await user.save({ validateBeforeSave: false });

	res.status(200).json(
		new ApiResponse(200, null, "Email verified successfully")
	);
});

const requestForgotPassword = dbHandler(async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user)
			return res.status(400).json(new ApiError(400, "User not found"));

		const info = await sendMail(user.email, "reset", user._id);
		console.log("info: ", info);

		res.status(200).json(
			new ApiResponse(200, null, "Password reset email sent")
		);
	} catch (error) {
		throw new ApiError(500, `Internal Server Error ${error}`);
	}
});

const resetForgotPassword = dbHandler(async (req, res) => {
	const { token } = req.query;
	const { password, confirmPassword } = req.body;

	if (password !== confirmPassword)
		return res.status(400).json(new ApiError(400, "Passwords do not match"));

	if (!token)
		return res.status(400).json(new ApiError(400, "Token is required"));

	try {
		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiry: { $gt: Date.now() },
		});

		if (!user)
			return res
				.status(400)
				.json(new ApiError(400, "Invalid token or token expired"));

		user.password = password;
		user.forgotPasswordToken = undefined;
		user.forgotPasswordTokenExpiry = undefined;

		await user.save();

		res.status(200).json(
			new ApiResponse(200, null, "Password reset successfully")
		);
	} catch (error) {
		throw new ApiError(500, `Internal Server Error ${error}`);
	}
});

// TODO: Add update user details

export {
	registerUser,
	loginUser,
	getMe,
	logoutUser,
	verifyUsersEmail,
	loginWithGoogle,
	requestForgotPassword,
	resetForgotPassword,
};
