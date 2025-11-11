import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface RequestExtended extends Request {
  userId: string;
}

interface TokenPayload {
  userId: string;
}

const authMiddleware = (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized bro token missing" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
