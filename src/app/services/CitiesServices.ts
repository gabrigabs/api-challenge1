import CitiesRepository from '../repositories/CitiesRepository';
import { Pagination } from '../interfaces';
import { BadRequest, NotFound } from '../errors';

class CitiesServices {
    async create(params: any) {
        const checkUnique = await CitiesRepository.findOne(params);
        if (checkUnique) throw new BadRequest('City already exists');
        const newData = await CitiesRepository.create(params);
        return newData;
    }

    async listAll(query: any): Promise<Pagination> {
        const allCities = await CitiesRepository.listAll(query);

        if (allCities.docs.length === 0) {
            throw new NotFound('No results found');
        }

        return allCities;
    }
}

export default new CitiesServices();
