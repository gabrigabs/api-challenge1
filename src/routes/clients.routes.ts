import { Application, Router } from 'express';
import ClientsController from '../app/controllers/ClientsController';
import errorMiddleware from '../app/middlewares/errorMidleware';

import { clientQueryValidation, clientValidation } from '../app/validations';

export default (server: Application, routes: Router, prefix = '/api/v1') => {
  routes.post('/clients', clientValidation, ClientsController.Create);
  routes.get('/clients', clientQueryValidation, ClientsController.ListAll);
  routes.get('/clients/:id', ClientsController.FindOneById);
  routes.get('/clients/nome/:nome', ClientsController.FindOneByName);

  server.use(prefix, routes, errorMiddleware);
};
