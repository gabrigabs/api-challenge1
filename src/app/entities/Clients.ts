import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Cities from './Cities';
import { Gender } from '../utils/genderEnum';

@Entity('Clients')
class Clients {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    full_name!: string;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender!: Gender;

    @Column()
    birthdate!: Date;

    @Column()
    age!: number;

    @Column()
    city_id!: string;

    @ManyToOne(() => Cities)
    @JoinColumn({ name: 'city_id' })
    location!: Cities;
}

export default Clients;
