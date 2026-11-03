import type { INotificationSchema } from "../controller/schemas/NotifactionSchema.js";
import type { NotificationRepository } from "../repository/NotificationRepository.js";

export class NotificationService {

    constructor(private readonly _notificationRepository: NotificationRepository) {}

    async create(data: INotificationSchema) {
        return await this._notificationRepository.create(data);
    }
}