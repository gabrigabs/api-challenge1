import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum Sexo {
  masculino = 'Masculino',
  feminino = 'Feminino',
  outro = 'Outro',
}

@Entity()

class Clients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome_completo: string;

  @Column({
    type: 'enum',
    enum: Sexo,
  })
  sexo: Sexo;

  @Column()
  data_nascimento: Date;

  @Column()
  idade: number;

  @Column()
  cidade_origem: string;
}

export default Clients;
