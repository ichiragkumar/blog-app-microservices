import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { UserInterface } from "../models/User";


export interface AuthenticatedRequest extends Request {
  user?: UserInterface | null;
}


export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Please Login - No auth header" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded || !decoded._id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("JWT verification error: ", error);
    res.status(401).json({ message: "Please Login - Jwt error" });
  }
};
