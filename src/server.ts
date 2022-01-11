/* eslint-disable no-console */
import App from './app';
import 'dotenv/config';

const port = process.env.PORT || 3000;
const app = new App().server;

app.listen(port, () => console.log('Server up'));
