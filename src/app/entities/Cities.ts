import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cidades')

class Cities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;
}

export default Cities;
