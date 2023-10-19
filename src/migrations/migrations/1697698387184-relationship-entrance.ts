import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationshipEntrance1697698387184 implements MigrationInterface {
    name = 'RelationshipEntrance1697698387184';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "entrances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "name" character varying NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_42084a4198f5ed4c46257702e9d" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "entrances" ADD CONSTRAINT "FK_a83b934162b11a389012e374cb1" FOREIGN KEY ("parkingLotId") REFERENCES "parking-lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "entrances" DROP CONSTRAINT "FK_a83b934162b11a389012e374cb1"`
        );
        await queryRunner.query(`DROP TABLE "entrances"`);
    }
}
