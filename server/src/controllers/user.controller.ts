import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";

const registerUser = dbHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser)
    return res.status(400).json(new ApiError(400, "User already exists"));
});

export { registerUser };
