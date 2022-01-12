import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Cities from './Cities';
import { Gender } from '../utils/genderEnum';

@Entity('Clientes')
class Clients {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    nome_completo!: string;

    @Column({
        type: 'enum',
        enum: Gender
    })
    genero!: Gender;

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
