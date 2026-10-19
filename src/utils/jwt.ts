import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';


interface TokenPayLoad {
    id: string;
    email: string;
    role: string;
}

export const generateToken = (payload: TokenPayLoad): string => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN as string
    });
}

export const verifyToken = (token: string): TokenPayLoad => {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayLoad;
}