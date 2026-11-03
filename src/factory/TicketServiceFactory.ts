import { TicketService } from "../service/TicketService.js";
import { notificationRepositryFactory } from "./NotificationRepositoryFactory.js";
import { TicketCategoryRepositoryFactory } from "./TicketCategoryRepositoryFactory.js";
import { ticketRepositoryFactory } from "./TicketRepositoryFactory.js";

export const ticketServiceFactory = new TicketService(
    ticketRepositoryFactory,
    TicketCategoryRepositoryFactory,
    notificationRepositryFactory
)