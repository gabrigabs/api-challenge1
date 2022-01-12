import { Application, Router } from 'express';
import ClientsController from '../app/controllers/ClientsController';
import errorMiddleware from '../app/middlewares/errorMidleware';

import { clientQueryValidation, clientValidation, patchClientValidation, idValidation } from '../app/validations';

export default (server: Application, routes: Router, prefix = '/api/v1') => {
  routes.post('/clients', clientValidation, ClientsController.create);
  routes.get('/clients', clientQueryValidation, ClientsController.listAll);
  routes.get('/clients/:id', idValidation, ClientsController.findOneById);
  routes.get('/clients/nome/:nome', ClientsController.findOneByName);
  routes.patch('/clients/:id', idValidation, patchClientValidation, ClientsController.updateName);
  routes.delete('/clients/:id', idValidation, ClientsController.deleteOne);

  server.use(prefix, routes, errorMiddleware);
};
