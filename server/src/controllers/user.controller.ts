import fs from "fs";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { dbHandler } from "../utils/dbHandler";
import { sendMail } from "../utils/sendMail";
import { CookieOptions } from "express";
import { env } from "../conf/env";
import jwt, { JwtPayload } from "jsonwebtoken";
import { isValidObjectId, ObjectId } from "mongoose";
import axios from "axios";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 24, // 1 day
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

  if (!createdUser)
    return res
      .status(500)
      .json(new ApiError(500, "Failed to create user."));

  delete createdUser.password;

  await sendMail(createdUser.email, "verify", createdUser._id as ObjectId);

  res
    .status(201)
    .json(new ApiResponse(201, { user: createdUser }, "User created"));
});

const loginUser = dbHandler(async (req, res) => {
  const user = req.user;

  const token = user?.generateJwtToken();

  if (!token || !user)
    return res.status(400).json(new ApiError(400, "Login failed."));

  user.JwtToken = token;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(new ApiResponse(200, { user, token }, "Login sucessfull"));
});

const loginWithGoogle = dbHandler(async (req, res) => {
  const { accessToken } = req.query;

  if (!accessToken)
    return res
      .status(401)
      .json(new ApiError(401, "Access token not provided."));

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );

    const user = await User.findOne({ email: data.email });

    if (user)
      return res
        .status(200)
        .json(new ApiResponse(200, user, "Login sucessfull"));

    const newUser = await User.create({
      firstName: data.given_name,
      lastName: data.family_name,
      email: data.email,
      avatar: data.picture,
      isEmailVerified: data.isEmailVerified,
    });

    const token = newUser.generateJwtToken();

    newUser.JwtToken = token;

    await newUser.save({ validateBeforeSave: false });

    res
      .status(201)
      .cookie("token", token, cookieOptions)
      .json(
        new ApiResponse(201, { user: newUser, token }, "Login sucessfull")
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Login failed"));
  }
});

const getMe = dbHandler(async (req, res) => {
  const user = req.user;

  if (!user)
    return res.status(404).json(new ApiError(404, "User not found."));

  res
    .status(200)
    .json(new ApiResponse(200, { user }, "User fetched sucessfully"));
});

const logoutUser = dbHandler(async (req, res) => {
  delete req.user;

  res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(new ApiResponse(200, null, "Logout successful"));
});

const verifyUsersEmail = dbHandler(async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user)
    return res.status(404).json(new ApiError(404, "User not found."));

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, null, "Email verified successfully"));
});

const requestForgotPassword = dbHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json(new ApiError(400, "User not found"));

    await sendMail(user.email, "reset", user._id as ObjectId);

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password reset email sent"));
  } catch (error) {
    throw new ApiError(500, `Internal Server Error ${error}`);
  }
});

const resetForgotPassword = dbHandler(async (req, res) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res
      .status(400)
      .json(new ApiError(400, "Passwords do not match"));

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

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password reset successfully"));
  } catch (error) {
    throw new ApiError(500, `Internal Server Error ${error}`);
  }
});

const updateAvatar = dbHandler(async (req, res) => {
  const { email } = req.body;

  const avatarPath = req.file?.path;

  if (!email || !avatarPath)
    return res
      .status(400)
      .json(new ApiError(400, "Invalid email or avatar path"));

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json(new ApiError(404, "User not found"));

  const avatar = await uploadOnCloudinary(avatarPath);

  if (!avatar) {
    fs.unlinkSync(avatarPath);
    return res.status(500).json(new ApiError(500, "File upload failed."));
  }

  user.avatar = avatar;
  await user.save();

  res.status(200).json(new ApiResponse(200, user, "Avatar updated"));
});

const updateUser = dbHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json(new ApiError(400, "Invalid id"));

  const { firstName, lastName, phoneNumber } = req.body;

  if (!firstName || !lastName)
    return res
      .status(400)
      .json(new ApiError(400, "All fields are required."));

  const user = await User.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      phoneNumber,
    },
    {
      new: true,
    }
  ).select("-password");

  if (!user)
    return res.status(404).json(new ApiError(404, "User not found"));

  res.status(200).json(new ApiResponse(200, user, "User updated"));
});

const refreshJwtToken = dbHandler(async (req, res) => {
  const { token } = req.query;

  if (!token)
    return res.status(400).json(new ApiError(400, "Token is required"));

  const decoded = jwt.verify(String(token), env.jwtSecret) as JwtPayload;

  const user = await User.findById(decoded._id);

  if (!user)
    return res.status(404).json(new ApiError(404, "Invalid token"));

  if (user.JwtToken !== token)
    return res.status(400).json(new ApiError(400, "Invalid token"));

  const newToken = user.generateJwtToken();
  user.JwtToken = newToken;

  await user.save();

  res.status(200).json(new ApiResponse(200, newToken, "Token refreshed"));
});

export {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  verifyUsersEmail,
  loginWithGoogle,
  requestForgotPassword,
  resetForgotPassword,
  updateAvatar,
  updateUser,
  refreshJwtToken,
};
