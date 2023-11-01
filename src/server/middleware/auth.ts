import jwt from "jsonwebtoken";
import 'dotenv';
import { NextFunction, Request, Response } from "express";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY || "kek");
        req.query.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}