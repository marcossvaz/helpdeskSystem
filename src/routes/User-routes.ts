import { Router } from "express";
import { UserController } from "../controller/UserController.js";


export const userRoute = Router()
export const userRoutes = new UserController();

userRoute.post('/user', userRoutes.create);