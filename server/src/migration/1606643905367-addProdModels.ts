import {MigrationInterface, QueryRunner} from "typeorm";

export class addProdModels1606643905367 implements MigrationInterface {
    name = 'addProdModels1606643905367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "profileId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."availableQty" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "availableQty" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d037a6704e2acea2438d9ab218b" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d037a6704e2acea2438d9ab218b"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "availableQty" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."availableQty" IS NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "profileId"`);
    }

}
