import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import passport from "passport";
import { jwtLocalStrategy } from "../strategy/jwtLocal";

export const registerFieldConfig = [
  { name: "coverImage", maxCount: 1 },
  { name: "avatar", maxCount: 1 },
];

const userRouter = Router();

// routes

userRouter.route("/register").post(upload.fields(registerFieldConfig), registerUser);

userRouter.route("/login").post(loginUser);

// protected routes

userRouter.route("/me").get(passport.authenticate("jwt", { session: false }), getMe);

export { userRouter };
