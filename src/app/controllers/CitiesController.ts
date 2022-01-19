import { NextFunction, Request, Response } from 'express';
import CitiesServices from '../services/CitiesServices';

class CitiesController {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const newCity = await CitiesServices.create(req.body);
            return res.status(201).json(newCity);
        } catch (error) {
            return next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const cities = await CitiesServices.listAll(req.query);
            return res.status(200).json(cities);
        } catch (error) {
            return next(error);
        }
    }

    async findAllByName(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { city } = req.params;
            const citiesByName = await CitiesServices.listAll({ city });
            return res.status(200).json(citiesByName);
        } catch (error) {
            return next(error);
        }
    }
}

export default new CitiesController();
