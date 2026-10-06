import express from 'express';
import cors from 'cors';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';


import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { env } from './config/env.js';
import swaggerSpec from './config/swagger.js';

//Alias express
export const app = express();


app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(helmet)
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static("uploads"));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//app.use("api/healh",routes); //todo passar a rota


//middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);
