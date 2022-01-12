import { getConnection } from 'typeorm';
import connection from '../src/infra/db/postgres';

beforeAll(async () => {
    await connection();
});

afterAll(async () => {
    getConnection().close();
});
