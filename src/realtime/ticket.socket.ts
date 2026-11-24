// realtime/ticket.handlers.ts
import { logger } from "../config/logger.js";
import type { TicketService } from "../service/TicketService.js";
import type { AppSocket } from "../types/socket.js";

type Ack = (result: { ok: boolean; error?: string }) => void;

export function registerTicketHandlers(socket: AppSocket, ticketService: TicketService) {
    socket.on("join_ticket_room", async (data: { ticketId: string }, ack?: Ack) => {
        try {
            if (!data?.ticketId) {
                return ack?.({ ok: false, error: "ticketId é obrigatório" });
            }

            const { role, id: userId } = socket.data.user;

            // o service já lança 404 se o ticket não existir
            const ticket = await ticketService.findById(data.ticketId);

            if (role === "CUSTOMER" && ticket?.customerId !== userId) {
                return ack?.({ ok: false, error: "Sem acesso ao ticket" });
            }

            if (role === "AGENT" && ticket?.AssisgnedAgentId !== userId) {
                return ack?.({ ok: false, error: "Sem acesso ao ticket" });
            }

            const room = `ticket:${data.ticketId}`;
            socket.join(room);

            if (role !== "CUSTOMER") {
                socket.join(`${room}:staff`);
            }

            logger.debug({ userId, ticketId: data.ticketId }, "User joined ticket room");
            ack?.({ ok: true });
        } catch (err) {
            logger.error({ err, ticketId: data?.ticketId }, "Error joining ticket room");
            ack?.({ ok: false, error: "Falha ao entrar na sala do ticket" });
        }
    });

    socket.on("leave_ticket_room", (data: { ticketId: string }) => {
        if (!data?.ticketId) return;

        const room = `ticket:${data.ticketId}`;
        socket.leave(room);
        socket.leave(`${room}:staff`);

        logger.debug(
            { userId: socket.data.user.id, ticketId: data.ticketId },
            "User left ticket room"
        );
    });
}