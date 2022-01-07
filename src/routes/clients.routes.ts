import { Application, Router } from 'express';

export default (server: Application, routes: Router, prefix = '/api/v1') => {
  routes.get('/clients', (req, res) => res.json({ message: 'Hello World' }).end());

  server.use(prefix, routes);
};
