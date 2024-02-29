import jwt from "jsonwebtoken";
import 'dotenv';
import { NextFunction, Response, Request } from "express";
import { BackendError } from "../types/backendError.js";

// export interface AuthRequest extends Request {
//   user: User;
// }

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  // const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "A token is required for authentication" });
  }
  const token = authHeader.split(" ")[1];
  try {
    if (!process.env.TOKEN_KEY) {
      const backendError = new BackendError("Server error: no token key", 500);
      return res.status(500).json({ error: backendError });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    (req as any).user = decoded;
    next(); // Call next to proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
}
