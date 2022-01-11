import { NextFunction, Request, Response } from 'express';
import ClientsServices from '../services/ClientsServices';

class ClientsController {
  async Create(req: Request, res: Response, next: NextFunction): Promise<Response | unknown> {
    try {
      const newClient = await ClientsServices.Create(req.body);
      return res.status(201).json(newClient);
    } catch (error) {
      return next(error);
    }
  }

  async ListAll(req: Request, res: Response, next: NextFunction): Promise<Response | unknown> {
    try {
      const allClients = await ClientsServices.ListAll(req.query);
      return res.status(200).json(allClients);
    } catch (error) {
      return next(error);
    }
  }

  async FindOneById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const client = await ClientsServices.findOne({ id: req.params.id });
      return res.status(200).json(client);
    } catch (error) {
      return next(error);
    }
  }

  async FindOneByName(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const client = await ClientsServices.findOne({ nome_completo: req.params.nome });
      return res.status(200).json(client);
    } catch (error) {
      return next(error);
    }
  }
}

export default new ClientsController();
