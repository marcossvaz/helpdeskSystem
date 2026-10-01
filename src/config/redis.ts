import { Redis } from "ioredis";
import { env } from "./env.js";
import { logger } from "./logger.js";

export const createRedisClient = (name = 'default') => {
    const client = new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: null,
    });

    client.on("error", (err) => logger.error({err}, `Redis [${name}]`));
    client.on('connect', () => logger.info('Redis is connected'))

    return client;
}

export const redis = createRedisClient('main');