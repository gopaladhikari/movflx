import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

const userRouter = Router();

userRouter.route("/register").post(registerUser);

export { userRouter };
