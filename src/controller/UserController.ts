import type { NextFunction } from 'express';
import { userCreateSchema } from './schemas/UserSchema.js';
import { userServiceFactory } from '../factory/UserServiceFactory.js';
import { AppError } from '../utils/AppError.js';
import type { Request, Response } from 'express';
import { ZodError } from 'zod';

export class UserController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const value =  userCreateSchema.parse(req.body);

            const result = await userServiceFactory.create(value); 

            return res.status(201).json(result);
        } catch (err) {
            if (err instanceof ZodError) {
                return next(new AppError("Algo de errado com entrada de dados", 400));
            }

            return next(err);
        }
    }
}