import type { NextFunction, Request, Response } from 'express';
import { createTicketSchema, customerId, tickerSchema, ticketNumberSchema, updateTicketStatusSchema } from './schemas/TicketSchema.js';
import { ticketServiceFactory } from '../factory/TicketServiceFactory.js';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

export class TicketController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const value = createTicketSchema.parse(req.body);
            const { id } = customerId.parse(req.params);

            const result = await ticketServiceFactory.create(value, id);
            return res.status(201).json(result);
        } catch (err) {
            if (err instanceof ZodError) {
                return next(new AppError("Algo de errado com entrada de dados", 401));
            }

            return next(err);
        }
    }

  

    findTicketByNumber = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ticketnumber } =  ticketNumberSchema.parse(req.params);

            const result = await ticketServiceFactory.findTicketByNumber(ticketnumber);
            return res.status(201).json(result);
        } catch (err) {
            if (err instanceof ZodError) {
                return next(new AppError("Algo de errado com entrada de dados", 401));
            }

            return next(err);
        }
    }
}