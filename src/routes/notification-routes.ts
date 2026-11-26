import { Router } from "express";
import { NotificationController } from "../controller/NotificationController.js";

export const notificationRoutes = Router();
export const notificationRoute = new NotificationController();


notificationRoutes.get('/notification/getUserNotification/:userId', notificationRoute.getUserNotifications);
