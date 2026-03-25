import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1] as string;

    const decoded = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET!
    ) as any;

    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};