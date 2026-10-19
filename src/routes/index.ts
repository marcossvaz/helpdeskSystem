import {Router} from 'express';
import { userRoute } from './User-routes.js';
import { ticketCategoryRoutes } from './TicketCategory-routes.js';
import { ticketRoutes } from './Ticket-routes.js';
import { auditLogRoutes } from './AuditLog-routes.js';

const routes = Router();

const routesAll = routes

// _______________ALLROUTES______________;
routesAll.use(userRoute);
routesAll.use(ticketCategoryRoutes);
routesAll.use(ticketRoutes);
routesAll.use(auditLogRoutes);

export default routesAll;