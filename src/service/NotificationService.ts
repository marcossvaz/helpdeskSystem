import type { INotificationSchema } from "../controller/schemas/NotifactionSchema.js";
import type { NotificationRepository } from "../repository/NotificationRepository.js";
import { AppError } from "../utils/AppError.js";

export class NotificationService {

    constructor(private readonly _notificationRepository: NotificationRepository) { }

    async create(data: INotificationSchema) {
        return await this._notificationRepository.create(data);
    }

    async getUserNotifications(userId: string) {
        return await this._notificationRepository.getUserNotifications(userId);
    }

    async getNotificationById(id: string) {
        return await this._notificationRepository.getNotificationById(id);
    }

    async markAsRead(userId: string, notificationId: string) {
        const notification = await this._notificationRepository.getNotificationById(notificationId);
        if(!notification) throw new AppError("Notification não encontrada", 404);
        if(notification.userId !== userId)  throw new AppError("nitidicação não bate com dados do usuário", 400);

        const result = await this._notificationRepository.markAsRead(notificationId );
        return result;
    }
}