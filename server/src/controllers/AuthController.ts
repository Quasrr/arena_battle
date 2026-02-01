import { prisma } from "../models/index.ts";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import type { RequestAuth } from '../types.ts';
import { requireEnv } from '../config/env.ts';
import { z } from 'zod';

const COOKIE_NAME = "access_token";

const AuthSchema = z.object({
    username: z.string().min(3, "Invalid username format (min. 3 characters)"),
    password: z
        .string()
        .min(8, "Invalid password format (min. 8 characters)")
        .refine(
            (v) =>
            /[a-z]/.test(v) &&
            /[A-Z]/.test(v) &&
            /[0-9]/.test(v) &&
            /[^a-zA-Z0-9]/.test(v),
        "Invalid password format. Please include uppercase, lowercase, a number, and a special character (min. 8 characters)"
    ),
});

class AuthController {
    async register(req: Request, res: Response) {
        const parsedAuth = AuthSchema.safeParse(req.body);
        
        if (!parsedAuth.success) {
            const errors = z.treeifyError(parsedAuth.error);
            return res.status(422).json({ errors });
        };

        const { username, password } = parsedAuth.data;

        try {
            const userCheck = await prisma.user.findUnique({ where: { username } });

            if (userCheck) {
                return res.status(409).json({ error: "Username already taken" });
            };

            const passwordHashed = await argon2.hash(password);

            const user = await prisma.user.create({
                data: {
                    username,
                    password: passwordHashed
                }
            });

            return res.status(201).json({ username: user.username  });

        } catch(error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        };
    };
    
    async login(req: Request, res: Response) {
        const parsedAuth = AuthSchema.safeParse(req.body);
        if (!parsedAuth.success) {
            const errors = z.treeifyError(parsedAuth.error);
            return res.status(422).json({ errors });
        };

        const { username, password } = parsedAuth.data;

        try {
            const user = await prisma.user.findUnique({ where: { username } });
            if (!user) return res.status(401).json({ error: "Invalid credentials" });

            if (await argon2.verify(user.password, password)) {
                const token = jwt.sign(
                    { username },
                    requireEnv("JWT_SECRET"),
                    { expiresIn: "1h" }
                );

                res.cookie(COOKIE_NAME, token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    path: "/",
                    maxAge: 1000 * 60 * 60
                });

                const { id, currentBattle } = user;

                return res.status(201).json({ id, username, currentBattle });
            }

            return res.status(401).json({ error: "Invalid credentials" });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        };
    };

    logout(_req: Request, res: Response) {
        res.clearCookie("access_token", { path: "/" });
        res.sendStatus(204);
    };

    async me(req: RequestAuth, res: Response) {
        try {
            if (!req.username) {
                throw new Error("Username needed");
            }

            const user = await prisma.user.findUnique({ where: { username: req.username } });

            if (!user) return res.status(401).json({ error: "Not authenticated" });

            const { id, username, currentBattle } = user;

            res.json({ id, username, currentBattle });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        };
    };
};

export default new AuthController();