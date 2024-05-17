import { Router } from "express";
import {
	getMe,
	loginUser,
	googleLoginCallback,
	logoutUser,
	registerUser,
	requestForgotPassword,
	resetForgotPassword,
	verifyUsersEmail,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import passport from "passport";
const userRouter = Router();

// public routes

userRouter.route("/register").post(upload.single("avatar"), registerUser);

userRouter
	.route("/login")
	.post(passport.authenticate("local", { session: false }), loginUser);

/**
 * --> This route is not begin because
 * * userRouter.route("/auth/google").get(passport.authenticate("google",
 * * { session: false }),(req, res) => {
 * * 	console.log(req);
 * * 	res.redirect(env.domain);
 * * });
 */

userRouter.get("/auth/google/callback", googleLoginCallback);

userRouter.route("/verify-users-email").post(verifyUsersEmail);

userRouter.route("/request-forgot-password").post(requestForgotPassword);

userRouter.route("/reset-forgot-password").post(resetForgotPassword);

// protected routes

userRouter
	.route("/logout")
	.post(passport.authenticate("jwt", { session: false }), logoutUser);

userRouter
	.route("/me")
	.get(passport.authenticate("jwt", { session: false }), getMe);

export { userRouter };
