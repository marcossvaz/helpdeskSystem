import type { TicketPriority } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import type { Ticket } from "../model/Ticket.js";

export class TicketRepository {

    async create(data: Ticket) {
        return await prisma.ticket.create({
            data: {
                
                title: data.title,
                description: data.description,
                priority: data.priority as TicketPriority,
                status: data.status,
                categoryId: data.categoryId,
                AssisgnedAgentId: data.AssisgnedAgentId,
                customerId: data.customerId,
                ticketnumber: data.ticketNumber,
                slaReponseDueAt: data.slaReponseDueAt,
                slaResolveDueAt: data.slaResolveDueAt
            }
        })
    }

    async findById(id: string) {
        return await prisma.ticket.findUnique({
            where: {
                id: id
            }
        })
    }
}