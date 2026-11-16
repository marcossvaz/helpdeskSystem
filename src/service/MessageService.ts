import { MessageType, type Role } from "../generated/prisma/enums.js";
import type { TicketMessageRepository } from "../repository/TicketMessageRepository.js";
import type { TicketRepository } from "../repository/TicketRepository.js";
import { AppError } from "../utils/AppError.js";

export class MessageService {

    constructor(
        private readonly _ticketRepositoryContainer: TicketRepository,
        private readonly _ticketMessageRepositoryContainer: TicketMessageRepository
    ) {}

    async getMessage(ticketId: string, userId: string,  userRole: Role) {
        const ticket = await this._ticketRepositoryContainer.findById(ticketId);
        if(!ticket) throw new AppError("algo de errado com ticket", 401);

        //controle de acesso
        if(userRole === 'CUSTOMER' && ticket.customerId !== userId) {
            throw new AppError("acesso negado", 403);
        }

        if(userRole === 'AGENT' && ticket.AssisgnedAgentId !== userId) {
            throw new AppError('Acesso negado', 403);
        }

        const excludeTupes = userRole === 'CUSTOMER' ? [MessageType.INTERNAL_NOTE] : [] ;
        return await this._ticketMessageRepositoryContainer.getAllTicketMessage(ticketId, excludeTupes);
    }


        


}