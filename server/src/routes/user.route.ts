import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

export const registerFieldConfig = [
	{ name: "coverImage", maxCount: 1 },
	{ name: "avatar", maxCount: 1 },
];

const userRouter = Router();

userRouter
	.route("/register")
	.post(upload.fields(registerFieldConfig), registerUser);

export { userRouter };
