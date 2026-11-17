import type { Request, Response, NextFunction } from 'express';
import { getRoleMessageSchema, getTicketmessageSchema, getUserMessageSchema, messageSchema } from './schemas/MessageSchema.js';
import { messageServiceContainer } from '../container/messageServiceContainer.js';
import { AppError } from '../utils/AppError.js';
import { ZodError } from 'zod';

export class MessageController {

    getMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ticketId } = getTicketmessageSchema.parse(req.params);
            const { userId } = getUserMessageSchema.parse(req.params);
            const role = getRoleMessageSchema.parse(req.body);

            const result = await messageServiceContainer.getMessage(ticketId, userId, role.userRole);
            res.status(200).json(result);
        } catch (err) {
            if (err instanceof ZodError) {
                return next(new AppError("Algo de errado", 401));
            }

            return next(err);
        }
    }

    sendMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ticketId } = getTicketmessageSchema.parse(req.params);
            const value = messageSchema.parse(req.body);

            const result = await messageServiceContainer.sendMessage(ticketId, value.authorId, value.role, value);
            return res.status(201).json(result);
        } catch (err) {
            if (err instanceof ZodError) {
                return next(new AppError("Algo de errado com entrada de dados"))
            }

            return next(err);
        }
    }

}