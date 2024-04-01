import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ApiError } from "../utils/ApiError";

type Info = {
  name: string;
};

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: Express.User, info: Info) => {
      if (err) return res.status(400).json(new ApiError(400, "Unauthorized"));
      else if (info.name === "TokenExpiredError")
        return res.status(400).json(new ApiError(400, "Token expired"));
      else if (!user)
        return res.status(400).json(new ApiError(400, "User not found"));

      next();
    }
  )(req, res, next);
};
