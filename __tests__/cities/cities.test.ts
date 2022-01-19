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
        const error = {
            description: 'BadRequest',
            message: 'City already exists'
        };
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
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toMatchObject(error);
    });

    it('Should not be able to post a city with a invalid body and return status 400', async () => {
        const error = [
            {
                description: 'city',
                message: '"city" is required'
            },
            {
                description: 'state',
                message: '"state" is required'
            }
        ];
        const city = {};
        const response = await request.post('/api/v1/cities').send(city);
        const { body, status } = response;
        expect(body).toEqual(error);
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
        const error = {
            description: 'Notfound',
            message: 'No results found'
        };
        const response = await request.get('/api/v1/cities?city=cityDeMentira');
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toMatchObject(error);
    });

    it('should not be able to insert invalid queries and return error with status 400', async () => {
        const error = [
            {
                description: 'queryFalsa',
                message: '"queryFalsa" is not allowed'
            }
        ];
        const response = await request.get('/api/v1/cities?queryFalsa=cityDeMentira');
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual(error);
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
        const error = {
            description: 'Notfound',
            message: 'No results found'
        };
        const response = await request.get('/api/v1/cities/cityNaoexistente');
        const { status, body } = response;
        expect(status).toBe(404);
        expect(body).toMatchObject(error);
    });
});
