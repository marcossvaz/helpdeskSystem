import {Router} from 'express';
import { userRoute } from './User-routes.js';
import { ticketCategoryRoutes } from './TicketCategory-routes.js';

const routes = Router();

const routesAll = routes

// _______________ALLROUTES______________;
routesAll.use(userRoute);
routesAll.use(ticketCategoryRoutes)

export default routesAll;