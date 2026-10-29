import type { TicketPriority } from "../generated/prisma/enums.js";

import type { TicketRepository } from "../repository/TicketRepository.js";
import type { ICreateTicketSchema } from "../controller/schemas/TicketSchema.js";
import { AppError } from "../utils/AppError.js";
import { createAuditLog } from "../utils/audit.js";
import { calculatesSLADates } from "../utils/sla.js";
import { generateTickerNumber } from "../utils/ticketNumber.js";
import type { TicketCategoryRepository } from "../repository/TicketCategoryRepository.js";
import { getIo } from "../config/socket.js";

export class TicketService {

    constructor(
        private readonly _ticketRepository: TicketRepository,
        private readonly _ticketCategoryRepository: TicketCategoryRepository
    ) { }

    async create(data: ICreateTicketSchema, customerId: string) {

        const category = await this._ticketCategoryRepository.findById(data.categoryId);
        if(!category) throw new AppError("categoria não encontrada", 404);

       const ticketNumber = await generateTickerNumber();
       const {slaResponseDueAt, slaResolveDueAt} = calculatesSLADates(data.priority as TicketPriority);

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
            detailsMetadata: {ticketNumber, priority: data.priority}
        })

        if(data.priority == 'URGENT') {
            try{
                const io = getIo();
                io.to('role:AGENT').to('role:TEAM_LEAD').to('role:ADMIN').emit('ticket_created', {
                    ticketId: ticket.id,
                    ticketNumber,
                    title: data.title,
                    priority: data.priority
                })
            } catch(_) {/* SOCKET NOT INITIALIZED YET*/}
        }

        return ticket;
    }


    async findById(id: string) {
        return await this._ticketRepository.findById(id);
    }

    async findTicketByNumber(ticketnumber: string) {
        return await this._ticketRepository.findTicketByNumber(ticketnumber)
    }
}