import { TicketMessageService } from "../service/TicketMessageService.js";
import { ticketMessageRepositoryCotainer } from "./ticketMessageRepositoryCotainer.js";


export const ticketMessageServiceCotainer = new TicketMessageService(ticketMessageRepositoryCotainer)