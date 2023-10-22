import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1697992361887 implements MigrationInterface {
    name = 'Init1697992361887';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" ALTER COLUMN "exitTime" DROP NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" ALTER COLUMN "exitTime" SET NOT NULL`
        );
    }
}
