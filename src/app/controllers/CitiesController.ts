import { NextFunction, Request, Response } from 'express';
import CitiesServices from '../services/CitiesServices';

class CitiesController {
  async Create(req: Request, res: Response, next: NextFunction): Promise<Response | unknown> {
    try {
      const newCity = await CitiesServices.Create(req.body);
      return res.status(201).json(newCity);
    } catch (error) {
      return next(error);
    }
  }

  async FindAll(req: Request, res: Response, next: NextFunction): Promise<Response | unknown> {
    try {
      const cities = await CitiesServices.ListAll(req.query);
      return res.status(200).json(cities);
    } catch (error) {
      return next(error);
    }
  }

  async FindAllByName(req: Request, res: Response): Promise<Response> {
    const { city } = req.params;
    const citiesByName = await CitiesServices.ListAll({ cidade: city });
    return res.status(200).json(citiesByName);
  }

  async FindAllByState(req: Request, res: Response): Promise<Response> {
    const { state } = req.params;
    const citiesByState = await CitiesServices.ListAll({ estado: state });
    return res.status(200).json(citiesByState);
  }
}

export default new CitiesController();
