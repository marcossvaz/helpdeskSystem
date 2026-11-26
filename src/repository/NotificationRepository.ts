import { prisma } from "../lib/prisma.js";
import type { Notification } from "../model/Notification.js";

export class NotificationRepository {
    async create(data: Notification) {
        return await prisma.notification.create({
            data: {
                userId: data.userId,
                title: data.title,
                type: data.type,
                metadata: data.metadata,
                message: data.message
            }
        })
    }

    async getUserNotifications(userId: string) {
        return await prisma.notification.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
    }

    async getNotificationById(id: string) {
        return await prisma.notification.findFirst({
            where: { id }
        })
    }

    async markAsRead(notificationId: string) {
        return await prisma.notification.update({
            where: { id: notificationId },
            data: { isRead: true }
        })
    }
 
}