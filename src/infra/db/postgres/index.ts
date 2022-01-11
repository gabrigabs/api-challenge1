/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const connection = async () => {
  await createConnection();
};
console.log('Db running');
export default connection;
