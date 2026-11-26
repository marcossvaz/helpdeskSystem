import type { Request, Response, NextFunction } from "express";
import { userIdNotificationSchema } from "./schemas/NotifactionSchema.js";
import { notificationServiceRepositry } from "../container/NotificationServiceFactory.js";
import { AppError } from "../utils/AppError.js";

export class NotificationController {

    // create routes
    getUserNotifications = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = await userIdNotificationSchema.parse(req.params);

            const result = await notificationServiceRepositry.getUserNotifications(userId);
            return res.status(200).json(result);
        } catch(err) {
            if(err instanceof AppError) {
               return next(new AppError("Algo de errado com entrada de dados", 401)); 
            }
            
            return next(err);
        }

       
    }
}