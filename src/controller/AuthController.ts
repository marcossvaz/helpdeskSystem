import type {Request, Response, NextFunction} from 'express';
import { loginSchema } from './schemas/authSchema.js';
import { authServiceFactory } from '../factory/authServiceFactory.js';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

export class AuthController {
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const value = loginSchema.parse(req.body);

            const result = await authServiceFactory.login(value);
            return res.status(201).json(result);
        } catch(err) {
            if(err instanceof ZodError) {
                return next(new AppError("Algo de errado com entrada de erra", 401));
            }

            return next(err);
        }
    }
}