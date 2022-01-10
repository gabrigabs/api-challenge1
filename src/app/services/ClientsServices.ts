import { getCustomRepository } from 'typeorm';
import ClientsRepository from '../repositories/ClientsRepository';
import { Client, Pagination } from '../interfaces';
import Clients from '../entities/Clients';
import paginate from '../utils/paginate';
import { NotFound } from '../errors';

class ClientsServices {
  private getRepo() {
    return getCustomRepository(ClientsRepository);
  }

  async Create(data: Client): Promise<Clients> {
    const newClient = await this.getRepo().save(data);
    return newClient;
  }

  async ListAll({ page = 1, limit = 10, ...query }): Promise<Pagination> {
    const filter = {
      take: limit,
      skip: (page - 1) * limit,
      where: query,
      relations: ['localizacao'],
    };
    const [docs, total] = await this.getRepo().findAndCount(filter);

    if (docs.length === 0) throw new NotFound('No results found');

    const result = {
      docs, total, filter, page, pages: (total / limit) + 1,
    };
    return paginate(result) as Pagination;
  }
}

export default new ClientsServices();
