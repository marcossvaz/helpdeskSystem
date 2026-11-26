import { NotificationService } from "../service/NotificationService.js";
import { notificationRepositryFactory } from "./NotificationRepositoryFactory.js";

export const notificationServiceContainer= new NotificationService(notificationRepositryFactory)