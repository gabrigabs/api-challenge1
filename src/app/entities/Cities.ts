import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cidades')
export default class Cities {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  cidade!: string;

  @Column()
  estado!: string;
}
