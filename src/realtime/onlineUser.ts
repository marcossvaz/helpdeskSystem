import { logger } from "../config/logger.js";
import { redis } from "../config/redis.js";

const ONLINE_PREFIX = 'online-sockets';
const TTL_SECONDS = 3600; // = 1 hora

export async function setUserOnline(userId: string, socketId: string): Promise<void> {
    try {
        const key = `${ONLINE_PREFIX}${userId}`;
        await redis.sadd(key, socketId);
        await redis.expire(key, TTL_SECONDS);
    } catch (err) {
        logger.warn({ err }, 'Redis setUserOnline falhou');
    }
}

export async function setUserOffline(userId: string, socketId: string): Promise<boolean> {
    try {
        const key = `${ONLINE_PREFIX}${userId}`;
        await redis.srem(key, socketId);
        const remainingConnections = await redis.scard(key);
        if (remainingConnections === 0) await redis.del(key);
        return remainingConnections === 0;
    } catch (err) {
        logger.warn({ err }, 'Redis setUserIffline failed');
        return true;
    }
}


export async function isUSerONline(userId: string): Promise<boolean> {
    try {
        return (await redis.scard(`${ONLINE_PREFIX}${userId}`)) > 0;
    } catch {
        return false;
    }
}


export async function getONlineUserIds(): Promise<string[]> {
    try {
        const keys = await redis.keys(`${ONLINE_PREFIX}*`);
        return keys.map((k) => k.replace(ONLINE_PREFIX, ''));
    } catch {
        return [];
    }
}