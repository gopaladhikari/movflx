import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (req.isAuthenticated()) return next();

  res.status(401).json(new ApiError(401, "Unauthorized request"));
};
