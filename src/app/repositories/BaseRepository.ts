import { DeleteResult, getConnection, UpdateResult } from 'typeorm';

export default class BaseRepository {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(params: any): Promise<any> {
    return getConnection().getRepository(this.model).save(params);
  }

  async listAll(query: any): Promise<any> {
    return getConnection().getRepository(this.model).findAndCount(query);
  }

  async findOne(query: any): Promise<any> {
    return getConnection().getRepository(this.model).findOne(query);
  }

  async updateOne(id: string, query: any): Promise<UpdateResult> {
    return getConnection().getRepository(this.model).update(id, query);
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return getConnection().getRepository(this.model).delete(id);
  }
}
