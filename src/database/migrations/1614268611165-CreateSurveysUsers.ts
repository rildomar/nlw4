import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUsers1614268611165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'surveys_users',
                columns: [
                    {
                        name: "id",
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: "user_id", // id da tabela Users
                        type: 'uuid',
                    },
                    {
                        name: "survey_id", // id da tabela Surveys
                        type: 'uuid',
                    },
                    {
                        name: "value",
                        type: 'number',
                        isNullable: true // Permite criar um dado na coluna com valor nulo;
                    },
                    {
                        name: "created_at",
                        type: 'timestamp',
                        default: 'now()'
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKUser',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKSurvey',
                        referencedTableName: 'surveys',
                        referencedColumnNames: ['id'],
                        columnNames: ['survey_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys_users');
    }

}
