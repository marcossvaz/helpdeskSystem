import dotenv from "dotenv";

dotenv.config();

export interface EnvConfig {
    NODE_ENV: string;
    PORT: number;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    DATABASE_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    MAX_FILE_SIZE_MB: number;
    FRONTEND_URL: string;
}

export const env: EnvConfig = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 5000,
    POSTGRES_USER: process.env.POSTGRES_USER || "user",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "password",
    POSTGRES_DB: process.env.POSTGRES_DB || "help",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://helpdesk:helpdesk@localhost:5432/helpdesk",
    REDIS_HOST: process.env.REDIS_HOST || "localhost",
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
    JWT_SECRET: process.env.JWT_SECRET || "change this secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '43434',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    MAX_FILE_SIZE_MB: Number(process.env.MAX_FILE_SIZE_MB) || 5,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200'
}

