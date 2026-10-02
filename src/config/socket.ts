import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";

import { Server as HttpServer } from "http";
import { env } from "./env.js";
import { createRedisClient } from "./redis.js";
import { logger } from "./logger.js";


let io: Server;

export function initSocketIO(httpServer: HttpServer): Server {
    io = new Server (httpServer, {
        cors: {
            origin: env.FRONTEND_URL,
            methods: ['GET', 'POST'],
            credentials: true
        },
    });

    try {
        const pubClient = createRedisClient();
        const subClient = createRedisClient();

        io.adapter(createAdapter(pubClient, subClient));
        logger.info(`socket.IO Redis adapter initialized`);
    } catch (err) {
        {
            logger.warn(`socket.IO Redis adapter is failed`);
        }
    }

    return io
}

export function getIo(): Server {
    if(!io) {
        throw new Error(`Socket.IO not initialized`);
    }

    return io
}