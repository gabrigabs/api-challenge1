import App from './app';
import 'dotenv/config';

import connection from './infra/db/postgres';

connection();
const port = process.env.PORT || 3000;

App.listen(port);
