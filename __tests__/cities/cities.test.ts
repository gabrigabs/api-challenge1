import supertest from 'supertest';
import App from '../../src/app';

const request = supertest(App);
describe('Cities tests', () => {
    it('Should be able to post a city', async () => {
        const city = {
            city: 'Fortaleza',
            state: 'CE'
        };
        const response = await request.post('/api/v1/cities').send(city);
        const { status, body } = response;
        expect(status).toBe(201);
        expect(body.city).toContain(city.city);
        expect(body.state).toContain(city.state);
        expect(body).toHaveProperty('id');
    });

    it('Should not be able to post a city that name and state already exists and return error', async () => {
        const city = {
            city: 'Fortaleza',
            state: 'CE'
        };
        await request.post('/api/v1/cities').send(city);
        const city2 = {
            city: 'Fortaleza',
            state: 'CE'
        };
        const response = await request.post('/api/v1/cities').send(city2);
        const { status } = response;
        expect(status).toBe(400);
    });

    it('Should not be able to post a city with a invalid body and return status 400', async () => {
        const city = {
            abc: '1234',
            esto: 'CE'
        };
        const response = await request.post('/api/v1/cities').send(city);
        const { status } = response;
        expect(status).toBe(400);
    });

    it('Should be able to list all cities and have pagination', async () => {
        const response = await request.get('/api/v1/cities?limit=1');
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

    it('should return a error when returns no results and return status 404', async () => {
        const response = await request.get('/api/v1/cities?city=cityDeMentira');
        const { status } = response;
        expect(status).toBe(404);
    });

    it('should not be able to insert invalid queries and return error with status 400', async () => {
        const response = await request.get('/api/v1/cities?queryFalsa=cityDeMentira');
        const { status } = response;
        expect(status).toBe(400);
    });

    it('should be able to change limit of results on queries', async () => {
        const response = await request.get('/api/v1/cities?limit=1');
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body.limit).toBe(1);
        expect(body.docs.length).toBe(1);
    });

    it('should be able to search by the city name on req params', async () => {
        const cityName = 'Fortaleza';

        const city = {
            city: 'Sao Paulo',
            state: 'SP'
        };
        await request.post('/api/v1/cities').send(city);

        const response = await request.get(`/api/v1/cities/${cityName}`);
        const { status, body } = response;
        expect(status).toBe(200);
        body.docs.forEach((doc: any) => expect(doc.city).toBe(cityName));
    });

    it('should be error on search a city that doesnt exist and return status 404', async () => {
        const response = await request.get('/api/v1/cities/cityNaoexistente');
        const { status } = response;
        expect(status).toBe(404);
    });

    it('should be able to search cities by state name on req params', async () => {
        const stateName = 'BA';

        const city = {
            city: 'Salvador',
            state: 'BA'
        };
        await request.post('/api/v1/cities').send(city);

        const response = await request.get(`/api/v1/cities/state/${stateName}`);
        const { status, body } = response;
        expect(status).toBe(200);
        body.docs.forEach((doc: any) => expect(doc.state).toBe(stateName));
    });

    it('should be error on search a state that doesnt exist and return status 404', async () => {
        const response = await request.get('/api/v1/cities/state/stateAleatorio');
        const { status } = response;
        expect(status).toBe(404);
    });
});
