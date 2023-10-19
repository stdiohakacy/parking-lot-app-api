import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitParkingRateEntity1697712954969 implements MigrationInterface {
    name = 'InitParkingRateEntity1697712954969';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "parking-rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "hours" integer NOT NULL, "rate" integer NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_2f1200b35b8f6012fca62799785" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-rates" ADD CONSTRAINT "FK_54b251ea8e49b9f121d5278ed07" FOREIGN KEY ("parkingLotId") REFERENCES "parking-lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "parking-rates" DROP CONSTRAINT "FK_54b251ea8e49b9f121d5278ed07"`
        );
        await queryRunner.query(`DROP TABLE "parking-rates"`);
    }
}
