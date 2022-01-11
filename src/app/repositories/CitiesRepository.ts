import Cities from '../entities/Cities';
import BaseRepository from './BaseRepository';

class CitiesRepository extends BaseRepository {
  constructor() {
    super(Cities);
  }
}

export default new CitiesRepository();
