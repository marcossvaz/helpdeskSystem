export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 500, isOpearational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOpearational;
        Error.captureStackTrace(this, new.target);
    }
}


export class BadRequestError extends AppError {
    constructor(message = "Bad request") {super(message, 400);}
}

export class UnauthorizedError extends AppError {
    constructor(message = "unauthorized") {super(message, 401)}
}