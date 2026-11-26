import type { Request, Response, NextFunction } from "express";
import { markAsReadSchema, userIdNotificationSchema } from "./schemas/NotifactionSchema.js";
import { notificationServiceContainer } from "../container/NotificationServiceFactory.js";
import { AppError } from "../utils/AppError.js";
import { resolve } from "node:dns";

export class NotificationController {

    getUserNotifications = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = await userIdNotificationSchema.parse(req.params);

            const result = await notificationServiceContainer.getUserNotifications(userId);
            return res.status(200).json(result);
        } catch(err) {
            if(err instanceof AppError) {
               return next(new AppError("Algo de errado com entrada de dados", 401)); 
            }
            
            return next(err);
        }
    }

    // make is routes
    markAsRead = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {notificationId, userId} = await markAsReadSchema.parse(req.params);
            const result = await notificationServiceContainer.markAsRead(userId, notificationId);
            return res.status(200).json(result);
        } catch (err) {
            if(err instanceof AppError) {
                return next(new AppError("Algo de errado com entradad e dados", 404));
            }

            return next(err);
        }
    }
}