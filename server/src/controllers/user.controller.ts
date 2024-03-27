import fs from "fs";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { dbHandler } from "../utils/dbHandler";
import { sendMail } from "../utils/sendMail";

type Files = { [fieldName: string]: Express.Multer.File[] };

const registerUser = dbHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const files = req.files as Files;

  const avatarLocalPath = files["avatar"]?.[0]?.path;
  const coverImageLocalPath = files["coverImage"]?.[0]?.path;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !avatarLocalPath ||
    !coverImageLocalPath
  )
    return res.status(400).json(new ApiError(400, "All fields are required."));

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    fs.unlinkSync(avatarLocalPath);
    fs.unlinkSync(coverImageLocalPath);
    return res.status(409).json(new ApiError(409, "User already exists."));
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar || !coverImage)
    return res.status(500).json(new ApiError(500, "File upload failed."));

  const createdUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    avatar,
    coverImage,
  });

  await createdUser.save({ validateBeforeSave: false });

  const user = await User.findById(createdUser?._id).select("-password");

  if (!user)
    return res.status(400).json(new ApiError(400, "User creation failed."));

  await sendMail(user.email, "verify", user._id);

  res.status(201).json(new ApiResponse(201, { user }, "User created"));
});

const loginUser = dbHandler(async (req, res) => {
  // @ts-expect-error user id is available
  const id = req.user._id;
  console.log({ req });

  const user = await User.findById(id).select("-password");
  console.log({ user });
  res
    .status(200)
    .json(new ApiResponse(200, { user: user }, "Login sucessfull"));
});

export { registerUser, loginUser };
