import { Router } from "express";
import { TicketController } from "../controller/TicketController.js";

export const ticketRoute = new TicketController();
export const ticketRoutes = Router();


ticketRoutes.post('/ticket/:id', ticketRoute.create);
