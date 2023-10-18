import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelationshipParkingSpot1697624127792
    implements MigrationInterface
{
    name = 'RelationshipParkingSpot1697624127792';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "parking-spots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "isFree" boolean NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_7e66cb37e6ec8f069c6b7bf5d25" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-spots" ADD CONSTRAINT "FK_43305d3db068ce2c11c4ab5e81a" FOREIGN KEY ("parkingLotId") REFERENCES "parking-lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "parking-spots" DROP CONSTRAINT "FK_43305d3db068ce2c11c4ab5e81a"`
        );
        await queryRunner.query(`DROP TABLE "parking-spots"`);
    }
}
