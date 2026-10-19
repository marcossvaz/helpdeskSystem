import type {NextFunction, Request, Response} from 'express';
import { createAuditLogSchema } from './schemas/AuditLogSchema.js';
import { auditLogServiceFactory } from '../factory/auditLogServiceFactory.js';
import { AppError } from '../utils/AppError.js';
import { ZodError } from 'zod';

export class AuditLogController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const value = createAuditLogSchema.parse(req.body);

            const result = await auditLogServiceFactory.create(value);
            return res.status(201).json(result);
        } catch (err) {
            if(err instanceof ZodError) {
                return next(new AppError("Algo de errado com entrada de dados", 401)) 
            }

            next(err);
        }
    }
}