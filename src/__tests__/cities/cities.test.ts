import supertest from 'supertest';
import { getConnection } from 'typeorm';
import App from '../../app';
import connection from '../../infra/db/postgres';

const request = supertest(App);
describe('Cities tests', () => {
  beforeAll(async () => {
    await connection();
  });
  afterEach(async () => {});

  afterAll(async () => {
    getConnection().close();
  });

  it('Should be able to post a city', async () => {
    const city = {
      cidade: 'Fortaleza',
      estado: 'Ceara'
    };
    const response = await request.post('/api/v1/cities').send(city);
    const { status, body } = response;
    expect(status).toBe(201);
    expect(body.cidade).toContain(city.cidade);
    expect(body.estado).toContain(city.estado);
    expect(body).toHaveProperty('id');
  });

  it('Should not be able to post another city equal name in same state', async () => {
    const city = {
      cidade: 'Fortaleza',
      estado: 'Ceara'
    };
    const response = await request.post('/api/v1/cities').send(city);
    const { status } = response;
    expect(status).toBe(400);
  });

  it('Should not be able to post a city with a invalid body', async () => {
    const city = {
      abc: '1234',
      esto: 'Ceara'
    };
    const response = await request.post('/api/v1/cities').send(city);
    const { status } = response;
    expect(status).toBe(400);
  });

  it('Should be able to list all cities', async () => {
    const response = await request.get('/api/v1/cities');
    const { status } = response;
    expect(status).toBe(200);
  });

  it('should return a error when returns no results', async () => {
    const response = await request.get('/api/v1/cities?cidade=CidadeDeMentira');
    const { status } = response;
    expect(status).toBe(404);
  });

  it('Shoulf not be able to insert invalid queries', async () => {
    const response = await request.get('/api/v1/cities?queryFalsa=CidadeDeMentira');
    const { status } = response;
    expect(status).toBe(400);
  });
});
