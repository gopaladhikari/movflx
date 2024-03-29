import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  verifyUsersEmail,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import passport from "passport";
import { isAuthenticated } from "../middlewares/auth.middleware";

export const registerFieldConfig = [
  { name: "coverImage", maxCount: 1 },
  { name: "avatar", maxCount: 1 },
];

const userRouter = Router();

// routes

userRouter
  .route("/register")
  .post(upload.fields(registerFieldConfig), registerUser);

userRouter.route("/login").post(passport.authenticate("local"), loginUser);
userRouter.route("/verify-users-email").post(verifyUsersEmail);

// protected routes

userRouter.route("/logout").post(isAuthenticated, logoutUser);
userRouter.route("/me").get(isAuthenticated, getMe);

export { userRouter };
