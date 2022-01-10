import { Application, Router } from 'express';
import CitiesController from '../app/controllers/CitiesController';
import errorMiddleware from '../app/middlewares/errorMidleware';
import { cityQueryValidation, cityValidation } from '../app/validations';

export default (server: Application, routes: Router, prefix = '/api/v1') => {
  routes.get('/cities', cityQueryValidation, CitiesController.FindAll);
  routes.get('/cities/state/:state', CitiesController.FindAllByState);
  routes.get('/cities/:city', CitiesController.FindAllByName);
  routes.post('/cities', cityValidation, CitiesController.Create);

  server.use(prefix, routes, errorMiddleware);
};
