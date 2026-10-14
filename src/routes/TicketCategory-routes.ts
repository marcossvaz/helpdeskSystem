import { Router } from "express";
import { TicketCategoryController } from "../controller/TicketCategoryController.js";

export const ticketCategoryRoutes = Router();
export const ticketCategoryRoute = new TicketCategoryController();

ticketCategoryRoutes.post('/ticketCategory', ticketCategoryRoute.create);
