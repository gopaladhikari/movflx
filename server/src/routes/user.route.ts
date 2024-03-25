import { Router } from "express";
import { getMe, registerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import passport from "passport";

export const registerFieldConfig = [
  { name: "coverImage", maxCount: 1 },
  { name: "avatar", maxCount: 1 },
];

const userRouter = Router();

// routes

userRouter.route("/register").post(upload.fields(registerFieldConfig), registerUser);

userRouter.route("/login").post(passport.authenticate("local", { session: false }), (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

// protected routes

userRouter.route("/me").get(passport.authenticate("jwt", { session: false }), getMe);

export { userRouter };
