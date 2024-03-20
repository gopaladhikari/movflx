import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";

const registerUser = dbHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  const files = req.files;

  if (!firstName || !lastName || !email || !password || !phoneNumber)
    throw new ApiError(400, "Server error 456");

  console.log("files: ", files);
  res.status(200).json(new ApiResponse(200, {}, "User created"));
});

export { registerUser };
