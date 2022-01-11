import { getConnection } from 'typeorm';
import connection from '../infra/db/postgres';

beforeAll(async () => {
  await connection();
});
afterEach(async () => {
  const data = getConnection().entityMetadatas;
  let repo;
  data.forEach(async (entity) => {
    repo = getConnection().getRepository(entity.name);
    await repo.delete({});
  });
});

afterAll(async () => {
  getConnection().close();
});
