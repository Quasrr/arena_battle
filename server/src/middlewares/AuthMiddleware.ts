import jwt from "jsonwebtoken";
import type { Response, NextFunction  } from "express";
import type { RequestAuth, JWTPayload } from "../types.ts";
import { requireEnv } from "../config/env.ts";
import { UnauthorizedError } from "../scripts/utils/Error.ts";
import ErrorHandler from "../scripts/ErrorHandler.ts";

class AuthMiddleware {
    requireAuth(req: RequestAuth, res: Response, next: NextFunction ) {
        const token = req.cookies?.["access_token"];

        if (!token) throw new UnauthorizedError("Not Authenticated");

        try {
            const payload = jwt.verify(token, requireEnv("JWT_SECRET")) as JWTPayload;
            
            if (!payload) throw new UnauthorizedError("Invalid token");

            req.username = payload.username;
            next();
        } catch(error) {
            ErrorHandler.sendError(res, error);
        };
    };
};

export default new AuthMiddleware();