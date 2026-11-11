import type { SocketData } from "../types/socket.js";
import type { TicketService } from "../service/TicketService.js";
import { logger } from "../config/logger.js";

export function registerTicketHandlers(socket: SocketData, ticketService: TicketService) {
  socket.on(
    "join_ticket_room",
    async (
      data: { ticketId: string },
      acknowledge?: (result: { ok: boolean; error?: string }) => void,
    ) => {
      try {
        if (!data?.ticketId) {
          return acknowledge?.({ ok: false, error: "ticketId é obrigatório" });
        }

        const ticket = await ticketService.findById(data.ticketId);
        if (!ticket) {
          return acknowledge?.({ ok: false, error: "Ticket not found" });
        }

        const { role, id: userId } = socket.user;

        if (role === "CUSTOMER" && ticket.customerId !== userId) {
          return acknowledge?.({ ok: false, error: "Acesso negado" });
        }

        if (role === "AGENT" && ticket.AssisgnedAgentId !== userId) {
          return acknowledge?.({ ok: false, error: "Acesso negado" });
        }

        const room = `ticket:${data.ticketId}`;
        socket.join(room);

        if (role !== "CUSTOMER") {
          socket.join(`${room}:staff`);
        }

        logger.debug({ userId, ticketId: data.ticketId }, "User joined ticket room");
        acknowledge?.({ ok: true });
      } catch (err) {
        logger.error({ err, ticketId: data?.ticketId }, "Error joining ticket room");
        acknowledge?.({ ok: false, error: "Falha ao entrar na sala do ticket" });
      }
    },
  );

  socket.on("leave_ticket_room", (data: { ticketId: string }) => {
    if (!data?.ticketId) return;

    const room = `ticket:${data.ticketId}`;
    socket.leave(room);
    socket.leave(`${room}:staff`);

    logger.debug(
      { userId: socket.user.id, ticketId: data.ticketId },
      "User left ticket room",
    );
  });
}