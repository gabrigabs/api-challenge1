import CitiesRepository from '../repositories/CitiesRepository';
import { Pagination } from '../interfaces';
import paginate from '../utils/paginate';
import { BadRequest, NotFound } from '../errors';

class CitiesServices {
  public async create(params: any) {
    const checkUnique = await CitiesRepository.findOne(params);
    if (checkUnique) throw new BadRequest('City already exists');
    const newData = await CitiesRepository.create(params);
    return newData;
  }

  async ListAll({ page = 1, limit = 10, ...query }): Promise<Pagination> {
    const filter = {
      take: limit,
      skip: (page - 1) * limit,
      where: query
    };
    const [docs, total] = await CitiesRepository.listAll(filter);

    if (docs.length === 0) throw new NotFound('No results found');

    const result = {
      docs,
      total,
      filter,
      page,
      pages: total / limit + 1
    };
    return paginate(result) as Pagination;
  }
}

export default new CitiesServices();
