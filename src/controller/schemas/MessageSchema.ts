import z from "zod";
import { ROLE } from "../../model/User.js";
import { MessageType } from "../../model/Message.js";

export const ticketSchema = z.object({

})

export const getTicketmessageSchema = z.object({
    ticketId: z.string().min(2, "O id da passado deve ser passado"),
})

export const getUserMessageSchema = z.object({
    userId: z.string().min(2, "O id do usupario deve passado deve ser passado"),
})

export const getRoleMessageSchema = z.object({
    userRole: z.enum(ROLE),
})

export const messageSchema = z.object({
    content: z.string().min(2, "Escreva a menssagem"),
    authorId: z.string().min(2, "digite o id da pessoa que enviou"),
    role: z.enum(ROLE),
    type: z.enum(MessageType)
})

export const senderIdSchema = z.object({
    senderId: z.string().min(2, "digite o id da pessoa que enviou")
})