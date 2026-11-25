import { logger } from "../config/logger.js";
import { socketAuthMiddleware } from "./socket.auth.js";
import type { AppServer } from "../types/socket.js";
import type { UserService } from "../service/UserService.js";
import type { TicketService } from "../service/TicketService.js";
import { registerTicketHandlers } from "./socket.socket.js";
import { setUserOffline } from "./onlineUser.js";
import { registerMessageHandlers } from "./message.socket.js";
import type { MessageService } from "../service/MessageService.js";
import { registerNotificationHandlers } from "./notification.socket.js";



export function setupSocketHandlers(io: AppServer, userService: UserService, ticketService: TicketService, messageService: MessageService) {
    io.use(socketAuthMiddleware(userService));

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

        // evento de registro
        registerTicketHandlers(socket, ticketService);
        registerMessageHandlers(socket, messageService);
        registerNotificationHandlers(socket, userService);

        socket.on("disconnect",  async(reason) => {
            logger.info({ userId, socketId: socket.id, reason }, "Socket disconnected");
            const isFullyOffline = await setUserOffline(userId, socket.id);
            if(isFullyOffline) socket.broadcast.emit('user_offline', {})

            if (isStaff) {
                socket.to("staff").emit("user_offline", { userId });
            }
        });
    });
}