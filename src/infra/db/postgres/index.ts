/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createConnection } from 'typeorm';
import 'dotenv/config';

const connection = async () => {
  if (process.env.NODE_ENV === 'tests') {
    await createConnection({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: 'tests',
      logging: false,
      synchronize: true,
      dropSchema: true,
      entities: ['src/app/entities/*.ts'],
      migrations: ['src/app/migrations/*.ts'],
      cli: {
        entitiesDir: 'src/app/entities',
        migrationsDir: 'src/infra/migrations'
      }
    });
  } else {
    await createConnection();
  }
  console.log('Db running');
};
export default connection;
