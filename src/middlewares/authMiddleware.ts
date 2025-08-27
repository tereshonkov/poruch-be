import jwt from "jsonwebtoken";
import { secret } from "../config/config";
import type { Request, Response, NextFunction } from "express";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Користувач не авторизований" });
    }

    const decoded = jwt.verify(token, secret);
    console.log("Decoded user:", decoded);
    if (!decoded || typeof decoded !== "object" || !("email" in decoded)) {
      return res.status(401).json({ message: "Некорректный токен: нет email" });
    }
    // @ts-ignore
    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Користувач не авторизований" });
  }
}
