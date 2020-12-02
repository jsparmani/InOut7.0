import {MigrationInterface, QueryRunner} from "typeorm";

export class addProdModels1606625809071 implements MigrationInterface {
    name = 'addProdModels1606625809071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "address_state_enum" AS ENUM('andhrapradesh', 'arunachalpradesh', 'assam', 'bihar', 'chhattisgarh', 'goa')`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "houseNumber" character varying NOT NULL, "street" character varying NOT NULL, "landmark" character varying NOT NULL, "num" integer NOT NULL, "city" character varying NOT NULL, "state" "address_state_enum" NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "availableQty" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TYPE "address_state_enum"`);
    }

}
