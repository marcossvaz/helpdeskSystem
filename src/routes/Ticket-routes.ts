import { Router } from "express";
import { TicketController } from "../controller/TicketController.js";

export const ticketRoute = new TicketController();
export const ticketRoutes = Router();


/**
 * @swagger
 * /api/helpDesk/ticket/{id}:
 *   post:
 *     summary: Cria um novo ticket de suporte
 *     description: Registra um novo chamado no sistema, calcula as datas de SLA e emite alertas via WebSocket se urgente.
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         description: ID do cliente extraído dos parâmetros da URL
 *         example: "user_uuid_123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketCreateInput'
 *     responses:
 *       201:
 *         description: Ticket criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketResponse'
 *       401:
 *         description: Erro de validação dos dados de entrada (ZodError) ou token inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Algo de errado com entrada de dados"
 *               statusCode: 401
 *       404:
 *         description: Categoria do ticket não encontrada no sistema.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "categoria não encontrada"
 *               statusCode: 404
 */
ticketRoutes.post('/ticket/:id', ticketRoute.create);


/**
 * @swagger
 * /api/helpDesk/ticketAll:
 *   get:
 *     summary: Lista todos os tickets com paginação
 *     description: Retorna uma lista paginada contendo os chamados cadastrados no sistema, ordenados por data de criação decrescente.
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Número da página atual
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *           minimum: 1
 *         description: Quantidade de itens por página (máximo 100)
 *         example: 10
 *     responses:
 *       200:
 *         description: Lista de tickets retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedTicketResponse'
 *       400:
 *         description: Erro na validação dos parâmetros de paginação (ZodError).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Algo de errado com entrada de dados"
 *               statusCode: 400
 *       401:
 *         description: Não autorizado (Token ausente ou inválido).
 */
ticketRoutes.get('/ticketAll', ticketRoute.getAllTicket);


ticketRoutes.get('/ticket/findTicketByNumber/:ticketnumber', ticketRoute.findTicketByNumber);
ticketRoutes.patch('/tickets/number/:ticketnumber', ticketRoute.updateStatus);