import { Application, Router } from 'express';
import ClientsController from '../app/controllers/ClientsController';
import errorMiddleware from '../app/middlewares/errorMidleware';

import { clientQueryValidation, clientValidation, patchClientValidation, idValidation } from '../app/validations';

export default (server: Application, routes: Router, prefix = '/api/v1') => {
  routes.post('/clients', clientValidation, ClientsController.Create);
  routes.get('/clients', clientQueryValidation, ClientsController.ListAll);
  routes.get('/clients/:id', idValidation, ClientsController.FindOneById);
  routes.get('/clients/nome/:nome', ClientsController.FindOneByName);
  routes.patch('/clients/:id', idValidation, patchClientValidation, ClientsController.UpdateName);
  routes.delete('/clients/:id', idValidation, ClientsController.DeleteOne);

  server.use(prefix, routes, errorMiddleware);
};
