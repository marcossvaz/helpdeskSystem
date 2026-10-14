import { prisma } from "../lib/prisma.js";
import type { Ticket } from "../model/Ticket.js";

export class TicketRepository {
    async create(data: Ticket) {
        return await prisma.ticket.create({
            data: {
                title: data.title,
                description: data.description,
                priority: data.priority,
                status: data.status,
                categoryId: data.categoryId,
                AssisgnedAgentId: data.AssisgnedAgentId,
                customerId: data.customerId
            }
        })
    }
}