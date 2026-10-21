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