import type { MessageType } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";

export class TicketMessageRepository {
    async getAllTicketMessage(ticketId: string, excludedTypes: MessageType[]= []) {
        return await prisma.ticketMessage.findMany({
            where: {
                ticketId,
                ...(excludedTypes.length && {type: {notIn: excludedTypes}})
            },
            orderBy: { createdAt: 'asc' }
        });
    }
}