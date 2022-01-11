/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createConnection } from 'typeorm';

const connection = async () => {
  if (process.env.NODE_ENV === 'tests') {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'docker',
      password: 'docker',
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
