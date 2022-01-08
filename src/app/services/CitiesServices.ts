/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import CitiesRepository from '../repositories/CitiesRepository';
import '../../infra/db/postgres';
import { City } from '../interfaces/cityInterface';

class CitiesServices {
  getRepo() {
    return getCustomRepository(CitiesRepository);
  }

  async Create(data: City) {
    const newCity = await this.getRepo().save(data);
    return newCity;
  }

  async ListAll(query: any) {
    const cities = await this.getRepo().find(query);
    return cities;
  }
}

export default new CitiesServices();
