import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";

export const authRoutes = Router()
export const authRoute = new AuthController();


authRoutes.post('/login', authRoute.login);