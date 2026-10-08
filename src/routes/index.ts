import {Router} from 'express';
import { userRoute } from './User-routes.js';

const routes = Router();

const routesAll = routes


routesAll.use(userRoute);

export default routesAll;