import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Gender } from '../../app/utils/genderEnum';

export default class CreateClientsNew1641593199506 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'Clients',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                        isNullable: false,
                        isUnique: true
                    },

                    {
                        name: 'full_name',
                        type: 'varchar',
                        isNullable: false
                    },

                    {
                        name: 'gender',
                        type: 'enum',
                        enum: Object.keys(Gender),
                        isNullable: false
                    },
                    {
                        name: 'birthdate',
                        type: 'date',
                        isNullable: false
                    },
                    {
                        name: 'age',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'city_id',
                        type: 'uuid',
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_city',
                        columnNames: ['city_id'],
                        referencedTableName: 'Cities',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Clients');
    }
}
