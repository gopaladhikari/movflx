import { NextFunction, Request, RequestHandler, Response } from "express";

export const dbHandler =
  (requestHandler: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      requestHandler(req, res, next);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
