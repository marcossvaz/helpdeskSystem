declare namespace NodeJs {
    export interface ProcessEnv {
        NODE_ENV: string;
        PORT: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_DB: string;
        DATABASE_URL: string;
        REDIS_HOST: string;
        REDIS_PORT: string;
        REDIS_URL: string;
        JWT_SECRET: string;
        JWT_EXPIRES_IN: string;
        JWT_REFRESH_SECRET: string;
        JWT_REFRESH_EXPIRES_IN: string;
        MAX_FILE_SIZE_MB: number
    }
}