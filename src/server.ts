import http from 'http';

import { app } from './app.js';
import { initSocketIO } from './config/socket.js';
import { setupSockettHandlers } from './realtime/socket.server.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

async function startServer() {

    const httpServer = http.createServer(app);
    const io = initSocketIO(httpServer);
    setupSockettHandlers(io);

    httpServer.listen(env.PORT, () => {
        logger.info(`Server is running on port ${env.PORT}`);
        logger.info(`Swagger docs: http://localhost:${env.PORT}/api/docs`);
        logger.info(`Socket.IO server: http://localhost:${env.PORT}`);
        logger.info(`Environment: ${env.NODE_ENV}`);
    });

    const shutdown = async (signal: string) => {
        logger.info(`${signal} received, shutting down`);
        io.close();
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
}

startServer().catch((err) => {
    logger.fatal({ err }, 'Failed to start server');
    process.exit(1);
});