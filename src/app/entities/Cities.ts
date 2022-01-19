import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { States } from '../utils/stateEnum';

@Entity('Cities')
export default class Cities {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    city!: string;

    @Column({
        type: 'enum',
        enum: Object.keys(States)
    })
    state!: States;
}
