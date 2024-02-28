import jwt from "jsonwebtoken";
import 'dotenv';
import { NextFunction, Response, Request } from "express";

export interface User {
  id: string;
  username: string;
}

// export interface AuthRequest extends Request {
//   user: User;
// }

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ error: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY || "kek") as User;
    (req as any).user = decoded;
    next(); // Call next to proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
}
