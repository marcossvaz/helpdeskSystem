import { Server } from 'socket.io';
import { logger } from '../config/logger.js';


export function setupSockettHandlers(io: Server) {
    io.on('connection', (socket) => {
        logger.info({socketId: socket.id}, "Socket connected");

        socket.emit('connected', {message: 'connected to HelpDesk live socket'});

        socket.on('disconnect', () => {
            logger.info({socketId: socket.id}, "Socket disconnected")
        });
    });
};