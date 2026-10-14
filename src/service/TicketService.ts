import type { ICreateTicketSchema } from "../controller/schemas/TicketSchema.js";
import type { TicketRepository } from "../repository/TicketRepository.js";

export class TicketService {

    constructor(private readonly _ticketRepository: TicketRepository) {}


    async create (data: ICreateTicketSchema) {
        return await this._ticketRepository.create(data);
    }
}