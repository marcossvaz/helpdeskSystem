import { TicketCategoryService } from "../service/TicketCategoryService.js";
import { TicketCategoryRepositoryFactory } from "./TicketCategoryRepositoryFactory.js";

export const ticketCategoryServiceFactory = new TicketCategoryService(TicketCategoryRepositoryFactory) 