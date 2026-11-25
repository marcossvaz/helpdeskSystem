import z from "zod"
import { notificationType } from "../../model/Notification.js";


export const notificationSchema = z.object({
    userId: z.string().min(1, "O id do usuário é obrigatório"),
    title: z.string().min(1, "O id ticker é obrigatório"),
    type: z.enum(notificationType),
    metadata: z.record(z.string(), z.unknown().optional()),
    message: z.string().min(2, "messagem obrigatório")
})


export const userIdNotificationSchema = z.object({
    userId: z.string().min(2, "Id é necessário")
})

// ======= TYPES =:

export type INotificationSchema = z.infer<typeof notificationSchema>;