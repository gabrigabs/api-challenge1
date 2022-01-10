import { Application, Router } from 'express';
import ClientsController from '../app/controllers/ClientsController';
import errorMiddleware from '../app/middlewares/errorMidleware';

export default (server: Application, routes: Router, prefix = '/api/v1') => {
  routes.post('/clients', ClientsController.Create);
  routes.get('/clients', ClientsController.ListAll);

  server.use(prefix, routes, errorMiddleware);
};
