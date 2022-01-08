import { EntityRepository, Repository } from 'typeorm';
import Cities from '../entities/Cities';

@EntityRepository(Cities)
class CitiesRepository extends Repository<Cities> {
}

export default CitiesRepository;
