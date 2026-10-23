import type { ICreateTicketSchema } from "../controller/schemas/TicketSchema.js";
import type { TicketRepository } from "../repository/TicketRepository.js";
import { createAuditLog } from "../utils/audit.js";

export class TicketService {

    constructor(
        private readonly _ticketRepository: TicketRepository
      
    ) {}


    async create (data: ICreateTicketSchema) {

        const ticket = await this._ticketRepository.create(data);

        await createAuditLog({
            userId: data.customerId,
            action:"TICKET_CREATED",
            entity: "Ticket",
            entityId: ticket.id
        })

        return ticket;
    }
}