import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1697979317998 implements MigrationInterface {
    name = 'Initial1697979317998';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "api_keys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "type" character varying NOT NULL DEFAULT 'PUBLIC', "name" character varying NOT NULL, "key" character varying NOT NULL, "hash" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "startDate" TIMESTAMP WITH TIME ZONE, "endDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e42cf55faeafdcce01a82d24849" UNIQUE ("key"), CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "amount" integer NOT NULL, "paymentTime" TIMESTAMP NOT NULL, "paymentMethod" character varying NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "parking_tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "entryTime" TIMESTAMP WITH TIME ZONE NOT NULL, "exitTime" TIMESTAMP WITH TIME ZONE NOT NULL, "vehicleId" uuid, "paymentId" uuid, CONSTRAINT "PK_376d72659be38251860f63ab014" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "licenseNo" character varying NOT NULL, "vehicleType" character varying NOT NULL, "parkingSpotId" uuid, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "parking_spots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "parkingSpotType" character varying NOT NULL, "isFree" boolean NOT NULL, "parkingLotId" uuid, CONSTRAINT "PK_e0b54c8ecaf56846b47ef1f32f8" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "parking_lots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "name" character varying NOT NULL, "address" character varying NOT NULL, "capacity" integer NOT NULL, CONSTRAINT "PK_27af37fbf2f9f525c1db6c20a48" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" uuid, "updatedBy" uuid, "deletedBy" uuid, "username" character varying NOT NULL, "password" jsonb NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "type" character varying NOT NULL DEFAULT 'parking_agent', "name" character varying NOT NULL, "address" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "activeKey" character varying, "avatar" text, "activeExpire" TIMESTAMP WITH TIME ZONE, "activatedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" ADD CONSTRAINT "FK_450ae8ca982d187bd2b55e81a00" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" ADD CONSTRAINT "FK_d729e9aa02f544f35c89c88aa0e" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "vehicles" ADD CONSTRAINT "FK_652b373e9f8ff0b32625a11f834" FOREIGN KEY ("parkingSpotId") REFERENCES "parking_spots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "parking_spots" ADD CONSTRAINT "FK_81fa507279f88fa36c1be3f2872" FOREIGN KEY ("parkingLotId") REFERENCES "parking_lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "parking_spots" DROP CONSTRAINT "FK_81fa507279f88fa36c1be3f2872"`
        );
        await queryRunner.query(
            `ALTER TABLE "vehicles" DROP CONSTRAINT "FK_652b373e9f8ff0b32625a11f834"`
        );
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" DROP CONSTRAINT "FK_d729e9aa02f544f35c89c88aa0e"`
        );
        await queryRunner.query(
            `ALTER TABLE "parking_tickets" DROP CONSTRAINT "FK_450ae8ca982d187bd2b55e81a00"`
        );
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "parking_lots"`);
        await queryRunner.query(`DROP TABLE "parking_spots"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "parking_tickets"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "api_keys"`);
    }
}
