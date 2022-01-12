import supertest from 'supertest';
import App from '../../src/app';

const request = supertest(App);

describe('Clients Test', () => {
  it('should be able to create a new Client', async () => {
    const city = {
      cidade: 'Fortaleza',
      estado: 'Ceara'
    };
    const cityres = await request.post('/api/v1/cities').send(city);
    const client = {
      nome_completo: 'Jose Silva',
      genero: 'Masculino',
      data_nascimento: '1981/05/01',
      idade: 40,
      id_cidade: `${cityres.body.id}`
    };

    const response = await request.post('/api/v1/clients').send(client);
    const { status, body } = response;

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body.nome_completo).toContain(client.nome_completo);
    expect(body.genero).toContain(client.genero);
    expect(body.data_nascimento).toContain(client.data_nascimento);
    expect(body.idade).toBe(client.idade);
    expect(body.id_cidade).toContain(cityres.body.id);
  });
});
