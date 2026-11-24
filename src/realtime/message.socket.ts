import { logger } from "../config/logger.js";
import type { MessageService } from "../service/MessageService.js";
import type { TicketService } from "../service/TicketService.js";
import type { AppSocket } from "../types/socket.js";


export function registerMessageHandlers(socket: AppSocket, messageService: MessageService) {
    socket.on('send_message', async (data: { ticketId: string, message: string }) => {
        try {
            await messageService.sendMessage(data.ticketId, socket.data.user.id, socket.data.user.role, { content: data.message });
        } catch (err) {
            logger.error({ err }, 'Error sending message via socket');
            socket.emit('error', { message: "Falha ao mandar menssagem" })
        }
    });

    // tipando o status
    socket.on("typing_start", (data: { ticketId: string }) => {
        emitTypingIfAuthorized(socket, data?.ticketId, "typing_start").catch(err => {
            logger.error({ err }, "Error ao enver o tipo de status")
        });
    });

    socket.on("typing_stop", (data: { ticketId: string }) => {
        emitTypingIfAuthorized(socket, data?.ticketId, "typing_start").catch(err => {
            logger.error({ err }, "Error ao enver o tipo de status")
        });
    });

    // message seen
    socket.on("message_seen", async (data: {ticketId: string; messageId: string}) => {
        try {
            const message = await messageService.findByTicketId(data.ticketId);
            if(!message || !canAcessTicket(socket, message.ticket)) return;

            await messageService.status(message.id);

            socket.to(`ticket:${data.ticketId}`).emit('message_seen', {
                ticketId: data.ticketId,
                messageId: data.messageId,
                seenBy: socket.data.user.id,
            });
        } catch(err) {
            logger.error({err}, "Erro ao marcar o status visto")
        }
    })

}

async function emitTypingIfAuthorized(
    socket: AppSocket,
    ticketId: string,
    event: 'typing_start' | 'tying_stop' ,
    ticketService?: TicketService, 
) {
    const ticket = await ticketService?.findById(ticketId);
    if(!ticket || !canAcessTicket(socket, ticket)) return;

    socket.to(`ticket:${ticketId}`).emit(event, {
        ticketId,
        userId: socket.data.user.id,
        ...(event === 'typing_start' ? {userName: socket.data.user.name}: {}),
    });
}


function canAcessTicket(
    socket: AppSocket,
    ticket: { customerId: string; AssisgnedAgentId: string | null },
) {
    const { id, role } = socket.data.user;

    if (role === "CUSTOMER") return ticket.customerId === id;
    if (role === "AGENT") return ticket.AssisgnedAgentId === id;
    return true;
}