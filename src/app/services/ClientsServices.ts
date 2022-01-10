import ClientsRepository from '../repositories/ClientsRepository';
import { Client, Pagination } from '../interfaces';
import Clients from '../entities/Clients';
import paginate from '../utils/paginate';
import { NotFound } from '../errors';
import clientSerializer from '../utils/ClientSerializer';;

class ClientsServices {


  async Create(data: Client): Promise<Clients> {
    const checkId = await ClientsRepository.findOne(data.id_cidade);
    if (!checkId) throw new NotFound('This city id doesnt exist');

    const newClient = await ClientsRepository.create(data);
    return newClient;
  }

  async ListAll({ page = 1, limit = 10, ...query }): Promise<Pagination> {
    const filter = {
      take: limit,
      skip: (page - 1) * limit,
      where: query,
      relations: ['localizacao'],
    };
    const [clients, total] = await ClientsRepository.listAll(filter);

    if (clients.length === 0) throw new NotFound('No results found');
    const docs = clients.map(clientSerializer);

    const result = {
      docs, total, filter, page, pages: (total / limit) + 1,
    };
    return paginate(result);
  }
}

export default new ClientsServices();
