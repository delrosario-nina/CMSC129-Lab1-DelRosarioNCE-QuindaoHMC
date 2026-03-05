import { Request, Response, NextFunction } from "express";

export const requireAdminKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.headers["x-admin-key"];

  if (!key || key !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};