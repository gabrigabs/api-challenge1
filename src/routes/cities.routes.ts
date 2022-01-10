import { Application, Router } from 'express';
import CitiesController from '../app/controllers/CitiesController';
import errorMiddleware from '../app/middlewares/errorMidleware';
import { cityQueryValidation, cityValidation } from '../app/validations';

const citiesController = new CitiesController();

export default async (server: Application, routes: Router, prefix = '/api/v1') => {
  routes.get('/cities', cityQueryValidation, citiesController.FindAll);
  routes.get('/cities/state/:state', citiesController.FindAllByState);
  routes.get('/cities/:city', citiesController.FindAllByName);
  routes.post('/cities', cityValidation, citiesController.Create);

  server.use(prefix, routes, errorMiddleware);
};
