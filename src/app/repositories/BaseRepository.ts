import { DeleteResult, EntityTarget, getConnection, UpdateResult } from 'typeorm';
import Cities from '../entities/Cities';
import Clients from '../entities/Clients';
import { Pagination } from '../interfaces';
import paginate from '../utils/paginate';

export default class BaseRepository {
    private model: any;

    constructor(model: EntityTarget<Clients | Cities>) {
        this.model = model;
    }

    async create(params: any): Promise<any> {
        return getConnection(process.env.NODE_ENV).getRepository(this.model).save(params);
    }

    async listAll({ page = 1, limit = 10, relations, ...query }: any): Promise<Pagination> {
        const filter = {
            take: limit,
            skip: (page - 1) * limit,
            query
        };
        if (relations) {
            Object.assign(filter, { relations: [relations] });
        }
        const [docs, total] = await getConnection(process.env.NODE_ENV).getRepository(this.model).findAndCount(filter);

        const result = {
            docs,
            total,
            filter,
            page,
            pages: total / limit + 1
        };
        return paginate(result);
    }

    async findOne(query: any): Promise<any> {
        return getConnection(process.env.NODE_ENV).getRepository(this.model).findOne(query);
    }

    async updateOne(id: string, query: any): Promise<UpdateResult> {
        return getConnection(process.env.NODE_ENV).getRepository(this.model).update(id, query);
    }

    async deleteOne(id: string): Promise<DeleteResult> {
        return getConnection(process.env.NODE_ENV).getRepository(this.model).delete(id);
    }
}
