import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cities')
export default class Cities {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    city!: string;

    @Column()
    state!: string;
}
