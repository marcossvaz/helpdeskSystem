import { Router } from "express";
import { TicketCategory } from "../controller/TicketCategory.js";

export const ticketCategoryRoutes = Router();
export const ticketCategoryRoute = new TicketCategory();

ticketCategoryRoutes.post('/ticketCategory', ticketCategoryRoute.create);
