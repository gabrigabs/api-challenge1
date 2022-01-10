/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import CitiesRepository from '../repositories/CitiesRepository';
import { City, Pagination } from '../interfaces';
import Cities from '../entities/Cities';
import paginate from '../utils/paginate';
import { NotFound, BadRequest } from '../errors';

class CitiesServices {
  getRepo() {
    return getCustomRepository(CitiesRepository);
  }

  async Create(data: City) : Promise<Cities> {
    const checkUnique = await this.getRepo().findOne(data);
    if (checkUnique) throw new BadRequest('This city already exists!');

    const { id, cidade, estado } = await this.getRepo().save(data);
    return { id, cidade, estado };
  }

  async ListAll({ page = 1, limit = 10, ...query }): Promise<Pagination> {
    const filter = {
      take: limit,
      skip: (page - 1) * limit,
      where: query,
    };
    const [docs, total] = await this.getRepo().findAndCount(filter);

    if (docs.length === 0) throw new NotFound('No results found');

    const result = {
      docs, total, filter, page, pages: (total / limit) + 1,
    };
    return paginate(result) as Pagination;
  }
}

export default new CitiesServices();
