import ClientsRepository from '../repositories/ClientsRepository';
import { Client, Pagination } from '../interfaces';
import Clients from '../entities/Clients';
import paginate from '../utils/paginate';
import { NotFound } from '../errors';
import clientSerializer from '../utils/ClientSerializer';
import CitiesRepository from '../repositories/CitiesRepository';

class ClientsServices {
  async Create(data: Client): Promise<Clients> {
    const checkId = await CitiesRepository.findOne(data.id_cidade);
    if (!checkId) throw new NotFound('This city id doesnt exist');

    const newClient = await ClientsRepository.create(data);
    return newClient;
  }

  async ListAll({ page = 1, limit = 10, ...query }): Promise<Pagination> {
    const filter = {
      take: limit,
      skip: (page - 1) * limit,
      where: query,
      relations: ['localizacao']
    };
    const [clients, total] = await ClientsRepository.listAll(filter);

    if (clients.length === 0) throw new NotFound('No results found');
    const docs = clients.map(clientSerializer);

    const result = {
      docs,
      total,
      filter,
      page,
      pages: total / limit + 1
    };
    return paginate(result);
  }

  async findOne(condition: object): Promise<Client> {
    const client = await ClientsRepository.findOne({ where: condition, relations: ['localizacao'] });
    if (!client) throw new NotFound('Client Not Found');

    return clientSerializer(client);
  }

  async updateOne(id: string, data: object): Promise<void> {
    const findId = await ClientsRepository.findOne(id);
    if (!findId) throw new NotFound('Client Not Found');
    await ClientsRepository.updateOne(id, { nome_completo: data });
  }

  async deleteOne(id: string): Promise<void> {
    const findId = await ClientsRepository.findOne(id);
    if (!findId) throw new NotFound('Client Not Found');
    await ClientsRepository.deleteOne(id);
  }
}

export default new ClientsServices();
