import type { TicketPriority, TicketStatus } from "../generated/prisma/enums.js";

export interface Ticket {
    ticketNumber: string;
    title: string;
    description: string;
    priority: TicketPriority | undefined;
    status: TicketStatus ;
    customerId: string ;
    AssisgnedAgentId?: string | undefined;
    categoryId: string ;
    slaReponseDueAt: Date;
    slaResolveDueAt: Date;
    
}