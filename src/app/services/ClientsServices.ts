import ClientsRepository from '../repositories/ClientsRepository';
import { Client, Pagination } from '../interfaces';
import Clients from '../entities/Clients';
import { NotFound } from '../errors';
import { clientSerializer, allClientsserializer } from '../utils/ClientSerializer';
import CitiesRepository from '../repositories/CitiesRepository';

class ClientsServices {
    async create(data: Client): Promise<Clients> {
        const location = await CitiesRepository.findOne(data.city_id);
        if (!location) throw new NotFound('This city id doesnt exist');
        const newClient = await ClientsRepository.create(data);
        return newClient;
    }

    async listAll({ relations = 'location', ...query }): Promise<Pagination> {
        const allClients = await ClientsRepository.listAll({ relations, ...query });

        if (allClients.docs.length === 0) throw new NotFound('No results found');

        return allClientsserializer(allClients);
    }

    async findOne(condition: object): Promise<Client> {
        const client = await ClientsRepository.findOne({ where: condition, relations: ['location'] });
        if (!client) throw new NotFound('Client Not Found');

        return clientSerializer(client);
    }

    async updateOne(id: string, data: object): Promise<void> {
        const findId = await ClientsRepository.findOne(id);
        if (!findId) throw new NotFound('Client Not Found');
        await ClientsRepository.updateOne(id, { full_name: data });
    }

    async deleteOne(id: string): Promise<void> {
        const findId = await ClientsRepository.findOne(id);
        if (!findId) throw new NotFound('Client Not Found');
        await ClientsRepository.deleteOne(id);
    }
}

export default new ClientsServices();
