import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.js';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Sistema de help-desk",
            version: '1.0.0',
            description: "Um sistema de mensagem em tempo real"
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`,
                description: "Development Server",
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                // Schema de entrada para o login
                LoginInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'fulano@gmail.com',
                            description: 'E-mail cadastrado do usuário'
                        },
                        password: {
                            type: 'string',
                            minLength: 2,
                            example: '123456',
                            description: 'Senha do usuário'
                        }
                    }
                },
                // Schema de resposta do login (retorna o usuário e o token)
                LoginResponse: {
                    type: 'object',
                    properties: {
                        user: {
                            $ref: '#/components/schemas/UserResponse'
                        },
                        token: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                            description: 'Token JWT gerado para autenticação'
                        }
                    }
                },
                // Schemas de usuário que já criamos antes
                UserCreateInput: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: { type: 'string', minLength: 2, example: 'João Silva' },
                        email: { type: 'string', format: 'email', minLength: 2, example: 'joao@email.com' },
                        password: { type: 'string', minLength: 2, example: '123456' },
                    }
                },
                UserResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'clx123abc456def789' },
                        name: { type: 'string', example: 'João Silva' },
                        email: { type: 'string', example: 'joao@email.com' },
                        createdAt: { type: 'string', format: 'date-time', example: '2026-03-31T12:00:00.000Z' }
                    }
                }, TicketCreateInput: {
                    type: 'object',
                    required: ['title', 'description', 'customerId', 'categoryId'],
                    properties: {
                        title: {
                            type: 'string',
                            minLength: 2,
                            example: 'Erro ao conectar no banco de dados',
                            description: 'Título/causa do problema'
                        },
                        description: {
                            type: 'string',
                            minLength: 2,
                            example: 'O sistema exibe erro 500 ao tentar salvar dados.',
                            description: 'Descrição detalhada do problema'
                        },
                        priority: {
                            type: 'string',
                            enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
                            default: 'MEDIUM',
                            example: 'URGENT',
                            description: 'Prioridade do ticket'
                        },
                        status: {
                            type: 'string',
                            enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
                            default: 'OPEN',
                            example: 'OPEN',
                            description: 'Status atual do ticket'
                        },
                        customerId: {
                            type: 'string',
                            minLength: 2,
                            example: 'e678cb4f-fa6f-4f8d-a8a6-163fbb320bdc',
                            description: 'Id do usuário que abriu a requisição'
                        },
                        AssisgnedAgentId: {
                            type: 'string',
                            nullable: true,
                            example: '1f53c092-3aeb-4e1f-b549-21f355901396',
                            description: 'Id do agente atribuído (opcional)'
                        },
                        categoryId: {
                            type: 'string',
                            minLength: 2,
                            example: 'a7bf97ad-c63c-444b-b067-8a08fa7e0e0e',
                            description: 'Id da categoria do ticket'
                        }
                    }
                },
                TicketResponse: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'ticket_uuid_987654' },
                        ticketnumber: { type: 'string', example: 'TICK-2026-0001' },
                        title: { type: 'string', example: 'Erro ao conectar no banco de dados' },
                        description: { type: 'string', example: 'O sistema exibe erro 500...' },
                        priority: { type: 'string', example: 'URGENT' },
                        status: { type: 'string', example: 'OPEN' },
                        customerId: { type: 'string', example: 'user_uuid_123456' },
                        AssisgnedAgentId: { type: 'string', nullable: true, example: 'agent_uuid_789012' },
                        categoryId: { type: 'string', example: 'cat_uuid_456789' },
                        slaReponseDueAt: { type: 'string', format: 'date-time', example: '2026-03-31T13:00:00.000Z' },
                        slaResolveDueAt: { type: 'string', format: 'date-time', example: '2026-04-01T12:00:00.000Z' },
                        createdAt: { type: 'string', format: 'date-time', example: '2026-03-31T12:00:00.000Z' }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Mensagem de erro' },
                        statusCode: { type: 'number', example: 400 }
                    }
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;