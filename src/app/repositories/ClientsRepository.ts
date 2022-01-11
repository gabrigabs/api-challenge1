import Clients from '../entities/Clients';
import BaseRepository from './BaseRepository';

class ClientsRepository extends BaseRepository {
  constructor() {
    super(Clients);
  }
}

export default new ClientsRepository();
