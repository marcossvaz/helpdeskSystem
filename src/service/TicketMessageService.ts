import type { TicketMessageRepository } from "../repository/TicketMessageRepository.js";

export class TicketMessageService{

    constructor(private readonly _ticketMessage: TicketMessageRepository) {}

    async getAllTicketMessage() {
        return await this._ticketMessage.getAllTicketMessage();
    }
}