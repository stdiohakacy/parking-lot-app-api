import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitExitEntity1697710123455 implements MigrationInterface {
    name = 'InitExitEntity1697710123455';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "exits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "name" character varying NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_bc10e84eb866599a06689b2c4e5" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "exits" ADD CONSTRAINT "FK_d117a8a87c839f1d17c9f60a2ad" FOREIGN KEY ("parkingLotId") REFERENCES "parking-lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "exits" DROP CONSTRAINT "FK_d117a8a87c839f1d17c9f60a2ad"`
        );
        await queryRunner.query(`DROP TABLE "exits"`);
    }
}
