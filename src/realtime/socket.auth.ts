import { Socket } from "socket.io";
import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
import { logger } from "../config/logger.js";
import type { UserService } from "../service/UserService.js";
import type { SocketData } from "../types/socket.js";

type AppSocket = Socket<any, any, any, SocketData>


export const socketAuthMiddleware = (userService: UserService) => async (socket: AppSocket, next: (err?: Error) => void) => {
    try {

        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
        // search if socket are exist 
        if (!token) return next(new Error("autenticação requerida"));

        // token verify stype
        const decoded = verifyToken(token);
        const user = await userService.findById(decoded.id);

        if (!user || user.status !== "ACTIVE") return next(new Error("Algo de errado com usuário ou está inativo"));

        socket.data.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
            agentStatus: user.agentStatus,
        };
       
        next();
    } catch (err) {
        logger.warn({ err }, "autenticação do socket falhou");
        next(new AppError("Error de autenticação", 401));
    }
}