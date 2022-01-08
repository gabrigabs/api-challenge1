import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()

class Cities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;
}

export default Cities;
