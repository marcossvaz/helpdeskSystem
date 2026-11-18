import { logger } from "../config/logger.js";
import { getIo } from "../config/socket.js";
import { MessageType, type Role } from "../generated/prisma/enums.js";
import type { Message } from "../model/Message.js";
import type { NotificationRepository } from "../repository/NotificationRepository.js";
import type { TicketMessageRepository } from "../repository/TicketMessageRepository.js";
import type { TicketRepository } from "../repository/TicketRepository.js";
import { AppError } from "../utils/AppError.js";

export class MessageService {

    constructor(
        private readonly _ticketRepositoryContainer: TicketRepository,
        private readonly _ticketMessageRepositoryContainer: TicketMessageRepository,
        private readonly _notificationRepositoryContainer: NotificationRepository
    ) { }

    async getMessage(ticketId: string, userId: string, userRole: Role) {
        const ticket = await this._ticketRepositoryContainer.findById(ticketId);
        if (!ticket) throw new AppError("algo de errado com ticket", 401);

        //controle de acesso
        if (userRole === 'CUSTOMER' && ticket.customerId !== userId) {
            throw new AppError("acesso negado", 403);
        }

        if (userRole === 'AGENT' && ticket.AssisgnedAgentId !== userId) {
            throw new AppError('Acesso negado', 403);
        }

        const excludeTupes = userRole === 'CUSTOMER' ? [MessageType.INTERNAL_NOTE] : [];
        return await this._ticketMessageRepositoryContainer.getAllTicketMessage(ticketId, excludeTupes);
    }

    async sendMessage(ticketId: string, authorId: string, senderRole: Role, data: Message) {
        const ticket = await this._ticketRepositoryContainer.findById(ticketId);
        if (!ticket) throw new AppError("ago de errado/ticket não existe", 404);

        if (ticket.status === "CLOSED") {
            throw new AppError("Messagem fechada");
        }

        if (senderRole === 'CUSTOMER' && ticket.customerId !== authorId) {
            throw new AppError("Acesso negado")
        }

        if (senderRole === 'AGENT' && ticket.AssisgnedAgentId !== authorId) {
            throw new AppError('Acesso negado')
        }

        const messageType = senderRole === 'CUSTOMER' ? 'CUSTOMER_MESSAGE' : 'AGENT_MESSAGE';

        const message = await this._ticketMessageRepositoryContainer.create(
            ticketId,
            {
                authorId,
                content: data.content,
                type: messageType,
                role: data.role
            });

        // set FirstResponse if agent's first reply
        if (senderRole !== 'CUSTOMER' && !ticket.firstResponseAt) {
            await this._ticketRepositoryContainer.updateResponse(ticketId);
        }

        logger.info({ ticketId, senderRole, type: messageType });

        const notifyUserId = senderRole === 'CUSTOMER' ? ticket.AssisgnedAgentId : ticket.customerId;
        const notification = notifyUserId
            ? await this._notificationRepositoryContainer.create({
                userId: notifyUserId,
                title: "New message",
                message: `New message in ticket ${ticket.ticketnumber}`,
                type: "NEW_MESSAGE",
                metadata: { ticketId, ticketNumber: ticket.ticketnumber }
            })
            : null;

        try {
            const io = getIo();
            io.to(`ticket:${ticketId}`).emit('new_message', { ticketId, message });
            if (notifyUserId && notification) {
                io.to(`user:${notifyUserId}`).emit(`Notification_received`, notification);
            }
        } catch (error) {
            logger.error({error, ticketId}, 'Falha ao mandar evento de socket')
        }

        return message;
    }
}