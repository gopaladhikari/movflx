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

export const registerFieldConfig = [
  { name: "coverImage", maxCount: 1 },
  { name: "avatar", maxCount: 1 },
];

const userRouter = Router();

// public routes

userRouter
  .route("/register")
  .post(upload.fields(registerFieldConfig), registerUser);

userRouter
  .route("/login")
  .post(passport.authenticate("local", { session: false }), loginUser);

userRouter.route("/verify-users-email").post(verifyUsersEmail);

// protected routes

userRouter
  .route("/logout")
  .post(passport.authenticate("jwt", { session: false }), logoutUser);

userRouter
  .route("/me")
  .get(passport.authenticate("jwt", { session: false }), getMe);

export { userRouter };
