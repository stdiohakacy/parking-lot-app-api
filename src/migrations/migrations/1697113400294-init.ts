import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697113400294 implements MigrationInterface {
    name = 'Init1697113400294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    }

}
