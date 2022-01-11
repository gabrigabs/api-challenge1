import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Cities from './Cities';

enum Sexo {
  masculino = 'Masculino',
  feminino = 'Feminino',
  outro = 'Outro'
}

@Entity('Clientes')
class Clients {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nome_completo!: string;

  @Column({
    type: 'enum',
    enum: Sexo
  })
  sexo!: Sexo;

  @Column()
  data_nascimento!: Date;

  @Column()
  idade!: number;

  @Column()
  id_cidade!: string;

  @ManyToOne(() => Cities)
  @JoinColumn({ name: 'id_cidade' })
  localizacao!: Cities;
}

export default Clients;
