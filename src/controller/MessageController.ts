import type{Request, Response, NextFunction} from 'express';
import { getRoleMessageSchema, getTicketmessageSchema, getUserMessageSchema } from './schemas/MessageSchema.js';
import { messageServiceContainer } from '../container/messageServiceContainer.js';
import { AppError } from '../utils/AppError.js';
import { ZodError } from 'zod';

export class MessageController {
    
    getMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {ticketId} = await getTicketmessageSchema.parse(req.params);
            const {userId} = await getUserMessageSchema.parse(req.params);
            const role = await getRoleMessageSchema.parse(req.body);

            const result = await  messageServiceContainer.getMessage(ticketId, userId, role.userRole);
            res.status(200).json(result);
        } catch (err) {
            if(err instanceof ZodError) {
                return next(new AppError("Algo de errado", 401));
            }
 
            return next(err);
        }
    }   
}