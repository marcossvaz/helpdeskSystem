import type { Request, Response, NextFunction } from "express"
import type { Role } from "../generated/prisma/enums.js"
import { AppError } from "../utils/AppError.js"

export const roleMiddleware = (...allowedRoles: Role[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError("Auntenticaçao é requerida", 401));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("você não tem permissão", 403))
        }
        next();
    };
};