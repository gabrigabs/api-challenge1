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

    it('should not be able to to create a client without all fields', async () => {
        const client = {};

        const response = await request.post('/api/v1/clients').send(client);
        const { status } = response;

        expect(status).toBe(400);
    });

    it('Should not e able to create a client with a unexistent city id', async () => {
        const client = {
            nome_completo: 'Jose Silva',
            genero: 'Masculino',
            data_nascimento: '1981/05/01',
            idade: 40,
            id_cidade: '4b321652-c1ca-4326-8290-b2031f5932ec'
        };

        const response = await request.post('/api/v1/clients').send(client);
        const { status } = response;

        expect(status).toBe(404);
    });

    it('Should be able to list all clients and have pagination', async () => {
        const response = await request.get('/api/v1/clients?limit=1');
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('docs');
        expect(body).toHaveProperty('limit');
        expect(body).toHaveProperty('page');
        expect(body).toHaveProperty('pages');
        expect(body).toHaveProperty('totalDocs');
        expect(body.docs.length).toBe(1);
        expect(body.limit).toBe(1);
    });

    it('Should not be able to filter with a invalid query', async () => {
        const response = await request.get('/api/v1/clients?query=hihi');
        const { status } = response;
        expect(status).toBe(400);
    });

    it('Should return not found when docs length is equal to zero', async () => {
        const response = await request.get('/api/v1/clients?nome_completo=hihi');
        const { status } = response;
        expect(status).toBe(404);
    });

    it('Should be able to find a client by id', async () => {
        const city = {
            cidade: 'Maracanau',
            estado: 'Ceara'
        };
        const cityres = await request.post('/api/v1/cities').send(city);
        const client = {
            nome_completo: 'Jose Silva Junior',
            genero: 'Masculino',
            data_nascimento: '2001/05/01',
            idade: 20,
            id_cidade: `${cityres.body.id}`
        };
        const clientinfo = await request.post('/api/v1/clients').send(client);

        const response = await request.get(`/api/v1/clients/${clientinfo.body.id}`);

        const { body, status } = response;

        expect(status).toBe(200);
        expect(body.id).toContain(clientinfo.body.id);
    });

    it('Should return Not Found when passes a valid id that doesnt exists', async () => {
        const response = await request.get('/api/v1/clients/4b321652-c1ca-4326-8290-b2031f5932ec');
        const { status } = response;
        expect(status).toBe(404);
    });

    it('Should return bad request when passes a invalid id format', async () => {
        const response = await request.get('/api/v1/clients/5595959484');
        const { status } = response;
        expect(status).toBe(400);
    });

    it('Should be able to find a client by name', async () => {
        const clientName = 'Jose Silva Junior';
        const response = await request.get(`/api/v1/clients/name/${clientName}`);
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body.nome_completo).toContain(clientName);
    });

    it('Should return not found when try to get a name that doesnt exist', async () => {
        const response = await request.get('/api/v1/clients/name/Naruto');
        const { status } = response;
        expect(status).toBe(404);
    });

    it('Should be able to change a client name', async () => {
        const city = {
            cidade: 'Rio de Janeiro',
            estado: 'Rio de Janeiro'
        };
        const cityres = await request.post('/api/v1/cities').send(city);
        const client = {
            nome_completo: 'Jose Silva Junior',
            genero: 'Masculino',
            data_nascimento: '2001/05/01',
            idade: 20,
            id_cidade: `${cityres.body.id}`
        };
        const clientTest = await request.post('/api/v1/clients').send(client);

        const newName = { nome_completo: 'Jose Silva Senior' };

        const patchClient = await request.patch(`/api/v1/clients/${clientTest.body.id}`).send(newName);
        const { status } = patchClient;

        const findClient = await request.get(`/api/v1/clients/${clientTest.body.id}`);
        const { body } = findClient;

        expect(status).toBe(204);
        expect(body.nome_completo).toContain(newName.nome_completo);
    });
    it('should return bad request when tryes to patch with a empty body', async () => {
        const response = await request.patch('/api/v1/clients/4b321652-c1ca-4326-8290-b2031f5932ec');
        const { status } = response;

        expect(status).toBe(400);
    });

    it('should return not found when tryes to patch with a valid but a inexistent id', async () => {
        const client = { nome_completo: 'Jose Silva Senior' };

        const response = await request.patch('/api/v1/clients/4b321652-c1ca-4326-8290-b2031f5932ec').send(client);
        const { status } = response;

        expect(status).toBe(404);
    });

    it('should return bad request when tryes to patch with a invalid id', async () => {
        const client = { nome_completo: 'Jose Silva Senior' };

        const response = await request.patch('/api/v1/clients/4556534343').send(client);
        const { status } = response;

        expect(status).toBe(400);
    });

    it('should be able to delete a Client', async () => {
        const city = {
            cidade: 'Salvador',
            estado: 'Bahia'
        };
        const cityres = await request.post('/api/v1/cities').send(city);

        const client = {
            nome_completo: 'Jose Silva Junior',
            genero: 'Masculino',
            data_nascimento: '2001/05/01',
            idade: 20,
            id_cidade: `${cityres.body.id}`
        };
        const clientTest = await request.post('/api/v1/clients').send(client);

        const response = await request.delete(`/api/v1/clients/${clientTest.body.id}`);
        const { status } = response;

        const tryToFind = await request.get(`/api/v1/clients/${clientTest.body.id}`);

        expect(status).toBe(204);
        expect(tryToFind.status).toBe(404);
    });

    it('should return not found when tries to delete a valid id that doesnt exists', async () => {
        const response = await request.delete('/api/v1/clients/4b321652-c1ca-4326-8290-b2031f5932ec');
        const { status } = response;

        expect(status).toBe(404);
    });

    it('should return bad request when tries to delete a invalid id', async () => {
        const response = await request.delete('/api/v1/clients/5484989895959');
        const { status } = response;

        expect(status).toBe(400);
    });
});
