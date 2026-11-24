import { DeliveryStatus, type MessageType } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import type { Message } from "../model/Message.js";

export class TicketMessageRepository {
    async getAllTicketMessage(ticketId: string, excludedTypes: MessageType[] = []) {
        return await prisma.ticketMessage.findMany({
            where: {
                ticketId,
                ...(excludedTypes.length && { type: { notIn: excludedTypes } })
            },
            orderBy: { createdAt: 'asc' }
        });
    }
    // testar o endPoint
    async create(ticketId: string, data: Message) {
        return await prisma.ticketMessage.create({
            data :{
                ticketId : ticketId,
                content: data.content,
                authorId: data.authorId,
                type: data.type
            }
        })
    }

    async findByTicketId(ticketId: string) {
        return await prisma.ticketMessage.findFirst({
            where: {id: ticketId},
            include: {ticket: true}
        })
    }
    
    async status(ticketId: string) {
        return await prisma.ticketMessage.update({
            where: {id: ticketId},
            data: { deliveryStatus: 'SEEN'}
        })
    }
}