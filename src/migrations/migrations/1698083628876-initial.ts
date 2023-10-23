import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1698083628876 implements MigrationInterface {
    name = 'Initial1698083628876';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "payments" ADD "paymentStatus" character varying NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "payments" DROP COLUMN "paymentStatus"`
        );
    }
}
