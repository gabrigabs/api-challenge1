import { NextFunction, Request, Response } from 'express';
import ClientsServices from '../services/ClientsServices';

class ClientsController {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | unknown> {
        try {
            const newClient = await ClientsServices.create(req.body);
            return res.status(201).json(newClient);
        } catch (error) {
            return next(error);
        }
    }

    async listAll(req: Request, res: Response, next: NextFunction): Promise<Response | unknown> {
        try {
            const allClients = await ClientsServices.listAll(req.query);
            return res.status(200).json(allClients);
        } catch (error) {
            return next(error);
        }
    }

    async findOneById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const client = await ClientsServices.findOne({ id: req.params.id });
            return res.status(200).json(client);
        } catch (error) {
            return next(error);
        }
    }

    async findOneByName(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const client = await ClientsServices.findOne({ full_name: req.params.nome });
            return res.status(200).json(client);
        } catch (error) {
            return next(error);
        }
    }

    async updateName(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            await ClientsServices.updateOne(req.params.id, req.body.full_name);
            return res.status(204).end();
        } catch (error) {
            return next(error);
        }
    }

    async deleteOne(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            await ClientsServices.deleteOne(req.params.id);
            return res.status(204).end();
        } catch (error) {
            return next(error);
        }
    }
}

export default new ClientsController();
