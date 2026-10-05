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
            }
        },
        // Opcional: Se quiser aplicar segurança globalmente ou deixar disponível
        security: [{
            bearerAuth: []
        }]
    },
    // routes of jsDoc for documentation
    apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;