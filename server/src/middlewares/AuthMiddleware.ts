import jwt from "jsonwebtoken";
import type { Response, NextFunction  } from "express";
import type { RequestAuth, JWTPayload } from "../types.ts";
import { requireEnv } from "../config/env.ts";

class AuthMiddleware {
    requireAuth(req: RequestAuth, res: Response, next: NextFunction ) {
        const token = req.cookies?.["access_token"];

        if (!token) return res.status(401).json({ error: "Not Authenticated" });

        try {
            const payload = jwt.verify(token, requireEnv("JWT_SECRET")) as JWTPayload;
            
            req.username = payload.username;
            next();
        } catch(error) {
            return res.status(401).json({ error: "Invalid token" });
        };
    };
};

export default new AuthMiddleware();