import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitParkingLotEntity1697620501854 implements MigrationInterface {
    name = 'InitParkingLotEntity1697620501854';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "parking-lots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_bd423ec0be9dec82528a3520343" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "parking-lots"`);
    }
}
