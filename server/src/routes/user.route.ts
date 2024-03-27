import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import passport from "passport";

export const registerFieldConfig = [
  { name: "coverImage", maxCount: 1 },
  { name: "avatar", maxCount: 1 },
];

const userRouter = Router();

// routes

userRouter
  .route("/register")
  .post(upload.fields(registerFieldConfig), registerUser);

userRouter.route("/login").post(passport.authenticate("local"), (req, res) => {
  console.log({ req, res });
});

// protected routes

export { userRouter };
