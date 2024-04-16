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
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import passport from "passport";
import { env } from "../conf/env";

const userRouter = Router();

// public routes

userRouter.route("/register").post(upload.single("avatar"), registerUser);

userRouter
	.route("/login")
	.post(passport.authenticate("local", { session: false }), loginUser);

userRouter.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		session: false,
	})
);

userRouter.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${env.domain}/auth/login`,
		session: false,
	}),
	loginWithGoogle
);

userRouter.route("/verify-users-email").post(verifyUsersEmail);

userRouter.route("/request-forgot-password").post(requestForgotPassword);

userRouter.route("/reset-forgot-password").post(resetForgotPassword);

// protected routes

userRouter
	.route("/logout")
	.post(passport.authenticate("jwt", { session: false }), logoutUser);

userRouter.route("/auth/google/sucess").get((req, res) => {
	if (req.user) return res.json({ user: req.user });
	else res.json({ message: "Nikal" });
});

userRouter
	.route("/me")
	.get(passport.authenticate("jwt", { session: false }), getMe);

export { userRouter };
