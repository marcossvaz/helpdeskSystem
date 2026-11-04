import type { TicketPriority } from "../generated/prisma/enums.js";

import type { TicketRepository } from "../repository/TicketRepository.js";
import type { ICreateTicketSchema, ITickerSchema, IUpdateTicketStatusSchema } from "../controller/schemas/TicketSchema.js";
import { AppError } from "../utils/AppError.js";
import { createAuditLog } from "../utils/audit.js";
import { calculatesSLADates } from "../utils/sla.js";
import { generateTickerNumber } from "../utils/ticketNumber.js";
import type { TicketCategoryRepository } from "../repository/TicketCategoryRepository.js";
import { getIo } from "../config/socket.js";
import type { NotificationRepository } from "../repository/NotificationRepository.js";
import type { notificationType } from "../model/Notification.js";
import { logger } from "../config/logger.js";

export class TicketService {

    constructor(
        private readonly _ticketRepository: TicketRepository,
        private readonly _ticketCategoryRepository: TicketCategoryRepository,
        private readonly _notificationRepository: NotificationRepository
    ) { }

    async create(data: ICreateTicketSchema, customerId: string) {

        const category = await this._ticketCategoryRepository.findById(data.categoryId);
        if (!category) throw new AppError("categoria não encontrada", 404);

        const ticketNumber = await generateTickerNumber();
        const { slaResponseDueAt, slaResolveDueAt } = calculatesSLADates(data.priority as TicketPriority);

        const ticket = await this._ticketRepository.create({
            ...data,
            customerId,
            ticketNumber,
            slaReponseDueAt: slaResponseDueAt,
            slaResolveDueAt: slaResolveDueAt,
        })


        await createAuditLog({
            userId: data.customerId,
            action: "TICKET_CREATED",
            entity: "Ticket",
            entityId: ticket.id,
            detailsMetadata: { ticketNumber, priority: data.priority }
        })

        if (data.priority == 'URGENT') {
            try {
                const io = getIo();
                io.to('role:AGENT').to('role:TEAM_LEAD').to('role:ADMIN').emit('ticket_created', {
                    ticketId: ticket.id,
                    ticketNumber,
                    title: data.title,
                    priority: data.priority
                })
            } catch (error) {
                logger.warn({error}, "Falha ao emitir evento de socket")
            }
        }

        return ticket;
    }

    async updateStatus(data: IUpdateTicketStatusSchema, ticketInput: ITickerSchema, userId: string) {
        const ticket = await this._ticketRepository.findTicketByNumber(ticketInput.ticketnumber);
        if (!ticket) throw new AppError("ticket não foi encontrado");

        if (ticket.status === "CLOSED") {
            throw new AppError('não pode mudar estatus de tocket com status de "CLOSED"');
        }

        let updateData = {
            status: data.status,
            ...(data.status === 'RESOLVED' && { resolvedAt: new Date() }),
            ...(data.status === 'CLOSED' && { closedAt: new Date() }),
        };

        const updated = await this._ticketRepository.updateStatus(
            ticketInput.ticketnumber,
            updateData,
            userId
        )

        await createAuditLog({
            userId,
            action: "STATUS_CHANGED",
            entity: "TICKET",
            entityId: ticket.id,
            detailsMetadata: { entity: ticket.id, status: data.status }
        });

        await this._notificationRepository.create({
            userId: ticket.customerId,
            title: "Ticket status updated",
            message: `Ticker ${ticket.ticketnumber} status changed ${data.status}`,
            type: data.typeNotification as notificationType,
            metadata: { ticket, status: data.status }
        })

        try {
            const io = getIo();
            io.to(`ticket:${ticket.id}`).emit("ticket_status_changed", {
                ticket: ticket.id,
                status: data.status,
            });
            io.to(`user:${ticket.customerId}`).emit(`notification_received`, {
                title: ticket.title,
                message: `ticket ${ticket.ticketnumber} status chenged ${data.status}`
            })
        } catch (error) {
            logger.warn({error}, "Falha ao emitir evento de socket");
        }

        return updated;
    }

    async findById(id: string) {
        return await this._ticketRepository.findById(id);
    }

    async findTicketByNumber(ticketnumber: string) {
        return await this._ticketRepository.findTicketByNumber(ticketnumber)
    }
}