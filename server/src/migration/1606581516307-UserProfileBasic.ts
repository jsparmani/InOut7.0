import {MigrationInterface, QueryRunner} from "typeorm";

export class UserProfileBasic1606581516307 implements MigrationInterface {
    name = 'UserProfileBasic1606581516307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "profile_gender_enum" AS ENUM('male', 'female', 'others')`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "gender" "profile_gender_enum" NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "myusers" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "tokenVersion" integer NOT NULL DEFAULT 0, "profileId" integer, CONSTRAINT "UQ_93999fadb433d5e9e0fec615894" UNIQUE ("email"), CONSTRAINT "REL_2bfbfe4b0d845bbda909618fbe" UNIQUE ("profileId"), CONSTRAINT "PK_adf0fc75117f253f54aa2a4a791" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "myusers" ADD CONSTRAINT "FK_2bfbfe4b0d845bbda909618fbeb" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "myusers" DROP CONSTRAINT "FK_2bfbfe4b0d845bbda909618fbeb"`);
        await queryRunner.query(`DROP TABLE "myusers"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TYPE "profile_gender_enum"`);
    }

}
