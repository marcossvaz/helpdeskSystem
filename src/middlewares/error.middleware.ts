import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { logger } from "../config/logger.js";

export const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    logger.error(
        { name: err?.constructor?.name, message: err?.message, stack: err?.stack },
        "Error Handler"
    );

    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};