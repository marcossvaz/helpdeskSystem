import { prisma } from "../lib/prisma.js";
import type { TicketCategory } from "../model/TicketCategory.js";

export class TicketCategoryRepository {
    
    async create(data: TicketCategory) {
        return await prisma.ticketCategory.create({
            data: {
                name: data.name,
                description: data.description
            }
        })
    }
}