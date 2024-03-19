import { ApiResponse } from "../utils/ApiResponse";
import { dbHandler } from "../utils/dbHandler";

const registerUser = dbHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "user created"));
});

export { registerUser };
