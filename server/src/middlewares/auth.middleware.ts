import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ req });
  if (req.isAuthenticated()) return next();

  res.status(401).json({ message: "Unauthorized" });
};
