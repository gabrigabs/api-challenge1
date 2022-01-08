import { Application, Router } from 'express';
import CitiesController from '../app/controllers/CitiesController';

export default (server: Application, routes: Router, prefix = '/api/v1') => {
  routes.get('/cities', CitiesController.FindAll);
  routes.get('/cities/state/:state', CitiesController.FindAllByState);
  routes.get('/cities/:city', CitiesController.FindAllByName);
  routes.post('/cities', CitiesController.Create);

  server.use(prefix, routes);
};
