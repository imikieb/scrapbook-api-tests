import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableNotes1651455210707 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'notes',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true
                },
                {
                    name: 'note',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false
                }
            ], 
            foreignKeys: [
                new TableForeignKey({
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users'
                })
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('notes', true, true, true);
    }
}
