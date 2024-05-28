import { Router } from "express";
import {
	getMe,
	loginUser,
	loginWithGoogle,
	logoutUser,
	registerUser,
	requestForgotPassword,
	resetForgotPassword,
	verifyUsersEmail,
	updateAvatar,
	updateUser,
	refreshJwtToken,
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
 * * userRouter.route("/auth/google").get(passport.authenticate("google",
 * * { session: false }),(req, res) => {
 * * 	console.log(req);
 * * 	res.redirect(env.domain);
 * * });
 */

userRouter.route("/login/google").post(loginWithGoogle);

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

userRouter
	.route("/update-avatar")
	.post(
		passport.authenticate("jwt", { session: false }),
		upload.single("avatar"),
		updateAvatar
	);

userRouter
	.route("/update-user")
	.post(passport.authenticate("jwt", { session: false }), updateUser);

userRouter.route("/refesh-jwt-token").post(refreshJwtToken);

export { userRouter };
