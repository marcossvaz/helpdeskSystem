import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";

export const authRoutes = Router()
export const authRoute = new AuthController();

/**
 * @swagger
 * /api/helpDesk/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Autentica o usuário no sistema de help-desk e retorna um token JWT.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       201:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Falha na autenticação (ZodError, usuário não encontrado, conta inativa ou senha incorreta).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               erroValidacao:
 *                 summary: Erro de validação (Zod)
 *                 value:
 *                   message: "Algo de errado com entrada de dados"
 *                   statusCode: 401
 *               erroUsuario:
 *                 summary: Usuário não encontrado ou senha inválida
 *                 value:
 *                   message: "algo de errado com usário"
 *                   statusCode: 401
 *               erroConta:
 *                 summary: Conta inativa
 *                 value:
 *                   message: "algo de errado com a conta"
 *                   statusCode: 401
 */
authRoutes.post('/login', authRoute.login);