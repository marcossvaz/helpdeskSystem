import { Router } from "express";
import { MessageController } from "../controller/MessageController.js";

const routesMessage = new MessageController();
export const routesMessages = Router();


routesMessages.get('/messages/:ticketId/:userId', routesMessage.getMessage);
routesMessages.post('/messages/send/:ticketId', routesMessage.sendMessage);