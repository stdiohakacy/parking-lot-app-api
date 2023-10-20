import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1697820963487 implements MigrationInterface {
    name = 'Init1697820963487';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "parking-tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "ticketNo" character varying NOT NULL, "timeIn" TIMESTAMP WITH TIME ZONE, "timeOut" TIMESTAMP WITH TIME ZONE, "amount" integer DEFAULT '0', "parkingLotId" uuid NOT NULL, "vehicleId" uuid NOT NULL, CONSTRAINT "PK_f7d1d6960ff9b62ab6daf08d95d" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "licenseNo" character varying NOT NULL, "parkingSpotId" uuid NOT NULL, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "parking-spots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "isFree" boolean NOT NULL, "parkingSpotType" text NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_7e66cb37e6ec8f069c6b7bf5d25" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "exits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "name" character varying NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_bc10e84eb866599a06689b2c4e5" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "parking-rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "hours" integer NOT NULL, "rate" integer NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_2f1200b35b8f6012fca62799785" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "parking-lots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_bd423ec0be9dec82528a3520343" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "entrances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "name" character varying NOT NULL, "parkingLotId" uuid NOT NULL, CONSTRAINT "PK_42084a4198f5ed4c46257702e9d" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "username" character varying NOT NULL, "password" jsonb NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "type" character varying NOT NULL DEFAULT 'parking_agent', "name" character varying NOT NULL, "address" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "activeKey" character varying, "avatar" text, "activeExpire" TIMESTAMP WITH TIME ZONE, "activatedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "api_keys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "type" character varying NOT NULL DEFAULT 'PUBLIC', "name" character varying NOT NULL, "key" character varying NOT NULL, "hash" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "startDate" TIMESTAMP WITH TIME ZONE, "endDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e42cf55faeafdcce01a82d24849" UNIQUE ("key"), CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-tickets" ADD CONSTRAINT "FK_67db3e71b44b3f5460aa5816abd" FOREIGN KEY ("parkingLotId") REFERENCES "parking-lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-tickets" ADD CONSTRAINT "FK_a4208c97bcd29d29329a00d7ed1" FOREIGN KEY ("vehicleId") REFERENCES "parking-tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "vehicles" ADD CONSTRAINT "FK_652b373e9f8ff0b32625a11f834" FOREIGN KEY ("parkingSpotId") REFERENCES "parking-spots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-spots" ADD CONSTRAINT "FK_43305d3db068ce2c11c4ab5e81a" FOREIGN KEY ("parkingLotId") REFERENCES "parking-lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "exits" ADD CONSTRAINT "FK_d117a8a87c839f1d17c9f60a2ad" FOREIGN KEY ("parkingLotId") REFERENCES "parking-lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-rates" ADD CONSTRAINT "FK_54b251ea8e49b9f121d5278ed07" FOREIGN KEY ("parkingLotId") REFERENCES "parking-lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "entrances" ADD CONSTRAINT "FK_a83b934162b11a389012e374cb1" FOREIGN KEY ("parkingLotId") REFERENCES "parking-lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "entrances" DROP CONSTRAINT "FK_a83b934162b11a389012e374cb1"`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-rates" DROP CONSTRAINT "FK_54b251ea8e49b9f121d5278ed07"`
        );
        await queryRunner.query(
            `ALTER TABLE "exits" DROP CONSTRAINT "FK_d117a8a87c839f1d17c9f60a2ad"`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-spots" DROP CONSTRAINT "FK_43305d3db068ce2c11c4ab5e81a"`
        );
        await queryRunner.query(
            `ALTER TABLE "vehicles" DROP CONSTRAINT "FK_652b373e9f8ff0b32625a11f834"`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-tickets" DROP CONSTRAINT "FK_a4208c97bcd29d29329a00d7ed1"`
        );
        await queryRunner.query(
            `ALTER TABLE "parking-tickets" DROP CONSTRAINT "FK_67db3e71b44b3f5460aa5816abd"`
        );
        await queryRunner.query(`DROP TABLE "api_keys"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "entrances"`);
        await queryRunner.query(`DROP TABLE "parking-lots"`);
        await queryRunner.query(`DROP TABLE "parking-rates"`);
        await queryRunner.query(`DROP TABLE "exits"`);
        await queryRunner.query(`DROP TABLE "parking-spots"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "parking-tickets"`);
    }
}
