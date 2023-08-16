import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAirQualityTable1692184711661 implements MigrationInterface {
    name = 'CreateAirQualityTable1692184711661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "airQuality" ("id" SERIAL NOT NULL, "polutionJson" json NOT NULL, "aqius" integer NOT NULL, "aqicn" integer NOT NULL, "mainus" character varying NOT NULL, "maincn" character varying NOT NULL, "ts" character varying NOT NULL, "datetime" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_2283a6445935743283abd002b7a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "airQuality"`);
    }

}
