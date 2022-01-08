/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

enum Sexo {
  masculino = 'Masculino',
  feminino = 'Feminino',
  outro = 'Outro',
}

export default class CreateClientsNew1641593199506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'Clientes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isNullable: false,
            isUnique: true,
          },

          {
            name: 'nome_completo',
            type: 'varchar',
            isNullable: false,

          },

          {
            name: 'sexo',
            type: 'enum',
            enum: [Sexo.masculino, Sexo.feminino, Sexo.outro],
            isNullable: false,
          },
          {
            name: 'data_nascimento',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'idade',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'cidade_origem',
            type: 'varchar',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_cidade',
            referencedTableName: 'Cidades',
            referencedColumnNames: ['cidade'],
            columnNames: ['cidade_origem'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',

          },

        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
