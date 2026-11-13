import { MessageService } from "../service/MessageService.js";
import { ticketMessageRepositoryCotainer } from "./ticketMessageRepositoryCotainer.js";
import { ticketRepositoryFactory } from "./TicketRepositoryFactory.js";

export const messageServiceContainer = new MessageService(
    ticketRepositoryFactory,
    ticketMessageRepositoryCotainer
);