import type {NextFunction, Request, Response} from 'express';
import { ticketCategorySchema } from './schemas/TicketCategorySchema.js';
import { ticketCategoryServiceFactory } from '../factory/TicketCategoryServiceFactory.js';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

export class TicketCategory {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const value = ticketCategorySchema.parse(req.body);

            const result = await ticketCategoryServiceFactory.create(value);
            return res.status(201).json(result);
        } catch (err) {
            if(err instanceof ZodError) {
                throw next( new AppError("Algo de errado com entrada de arquivos", 404));
            }

            return next(err);
        }
    }
}