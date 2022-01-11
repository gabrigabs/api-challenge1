import { Application, NextFunction, Request, Response, Router } from 'express';
import clients from './clients.routes';
import cities from './cities.routes';
import '../infra/db/postgres';

export default async (server: Application) => {
  server.use((req: Request, res: Response, next: NextFunction) => {
    clients(server, Router());
    cities(server, Router());

    next();
  });
};
