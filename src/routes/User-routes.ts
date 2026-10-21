import { Router } from "express";
import { UserController } from "../controller/UserController.js";


export const userRoute = Router()
export const userRoutes = new UserController();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreateInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           description: Nome do usuário
 *           example: "João Silva"
 *         email:
 *           type: string
 *           format: email
 *           minLength: 2
 *           description: Endereço de e-mail do usuário
 *           example: "joao@email.com"
 *         password:
 *           type: string
 *           minLength: 2
 *           description: Senha do usuário
 *           example: "123456"
 * 
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do usuário gerado
 *           example: "clx123abc456def789"
 *         name:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao@email.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-31T12:00:00.000Z"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Descrição da mensagem de erro"
 *         statusCode:
 *           type: number
 *           example: 400
 */

/**
/**
 * @swagger
 * /api/helpDesk/user:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Endpoint para cadastro de usuários no sistema de help-desk.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Erro na validação dos dados de entrada (ZodError).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Algo de errado com entrada de dados"
 *               statusCode: 400
 *       409:
 *         description: Conflito - E-mail já cadastrado no sistema.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Já existe email com esse usuário"
 *               statusCode: 409
 */
userRoute.post('/user', userRoutes.create);


/**
 * @swagger
 * /api/helpDesk/user/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     description: Retorna os dados de um usuário específico cadastrado no sistema.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: ID único do usuário
 *         example: "clx123abc456def789"
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Erro na validação do ID (ZodError).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Algo de errado com entrada de dados"
 *               statusCode: 400
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Algo de errado com usuário"
 *               statusCode: 404
 *       401:
 *         description: Não autorizado (Token ausente ou inválido).
 */
userRoute.get('/user/:id', userRoutes.findById);