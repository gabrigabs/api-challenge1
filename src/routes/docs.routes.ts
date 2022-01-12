import { Application, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../docs/swagger.json';

export default async (server: Application, routes: Router, prefix = '/api/v1') => {
    routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    server.use(prefix, routes);
};
