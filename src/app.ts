import express, { Application } from 'express';
import router from './routes';
import 'reflect-metadata';

class App {
    server: Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        router(this.server);
    }
}
export default new App().server;
