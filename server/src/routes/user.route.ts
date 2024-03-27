import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
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

// protected routes

userRouter.route("/me").get(isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user });
});

export { userRouter };
