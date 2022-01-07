import {
  Application,
  NextFunction, Request, Response, Router,
} from 'express';
import clients from './clients.routes';

export default (server: Application) => {
  server.use((req: Request, res: Response, next: NextFunction) => {
    clients(server, Router());

    next();
  });
};
