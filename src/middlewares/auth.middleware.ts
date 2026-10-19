import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { verifyToken } from '../utils/jwt.js';
import { userRepositoryFactory } from '../factory/UserRepositoryFactory.js';


export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError("Autenticação requerida", 401)
        }

        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token);

        const user = await userRepositoryFactory.findById(payload.id);

        if (!user) throw new AppError("Usuário não encontrado", 401);

        if (user.status !== "ACTIVE") throw new AppError("Usuário não está ativo na empresa", 401)

        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
            agentStatus: user.agentStatus
        }

        next()
    } catch (err) {
        if (err instanceof AppError) {
            next(err);
        } else {
            next(new AppError('O token deve está expirado', 401));
        }
    }
}