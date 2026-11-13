import { prisma } from "../lib/prisma.js";

export class TicketMessageRepository {
    async getAllTicketMessage(ticketId: string) {
        return await prisma.ticketMessage.findMany({
            where: { ticketId },
            orderBy: { createdAt: 'asc' }
        });
    }
}