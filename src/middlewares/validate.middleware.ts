import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodType } from "zod";
import type { Source } from "../types/global.js";


export const validate = (schema: ZodType, source: Source = "body"): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
            return;
        }

        if (source === "body") {
            req.body = result.data;
        } else {
            res.locals[source] = result.data;
        }

        next();
    };
};