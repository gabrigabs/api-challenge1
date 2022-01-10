import { NextFunction, Request, Response } from 'express';
import ClientsServices from '../services/ClientsServices';

class ClientsController {
  async Create(req: Request, res: Response, next:NextFunction):Promise<Response | unknown> {
    try {
      const newClient = await ClientsServices.Create(req.body);
      return res.status(201).json(newClient);
    } catch (error) {
      return next(error);
    }
  }

  async ListAll(req: Request, res: Response, next:NextFunction):Promise<Response | unknown> {
    try {
      const allClients = await ClientsServices.ListAll(req.query);
      return res.status(200).json(allClients);
    } catch (error) {
      return next(error);
    }
  }
}

export default new ClientsController();
