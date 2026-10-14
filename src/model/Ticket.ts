import type { TicketPriority, TicketStatus } from "../generated/prisma/enums.js";



export interface Ticket {
    title: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus ;
    customerId: string ;
    AssisgnedAgentId: string | undefined;
    categoryId: string ;
}