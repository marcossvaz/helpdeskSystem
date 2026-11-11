import type { Server } from "socket.io";
import { logger } from "../config/logger.js";
import { socketAuthMiddleware } from "./socket.auth.js";
import { userServiceFactory } from "../container/UserServiceFactory.js";
import type { SocketData } from "../types/socket.js";

type AppServer = Server<any, any, any, SocketData>;

export function setupSocketHandlers(io: AppServer) {
    io.use(socketAuthMiddleware(userServiceFactory));

    io.on("connection", (socket) => {
        const { id: userId, name, role } = socket.data.user;
        const isStaff = role === "AGENT" || role === "ADMIN";

        socket.join(`user:${userId}`);

        logger.info({ userId, name, role, socketId: socket.id }, "Socket connected");

        socket.emit("connected", { message: "connected to HelpDesk live socket" });

        if (isStaff) {
            socket.join("staff");
            socket.to("staff").emit("user_online", { userId, name, role });
        }

        socket.on("disconnect", (reason) => {
            logger.info({ userId, socketId: socket.id, reason }, "Socket disconnected");

            if (isStaff) {
                socket.to("staff").emit("user_offline", { userId });
            }
        });
    });
}