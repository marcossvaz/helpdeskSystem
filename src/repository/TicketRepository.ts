import type { TicketPriority } from "../generated/prisma/enums.js";
import type { TicketUpdateInput } from "../generated/prisma/models.js";
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

    async updateStatus(ticketnumber: string, data:TicketUpdateInput, userId:string) {
        return await prisma.ticket.update({
            where: {ticketnumber},
            data
        })
    }

    async findTicketByNumber(ticketnumber: string) {
        return await prisma.ticket.findUnique({
            where: {
                ticketnumber
            }
        })
    }
}