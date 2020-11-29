import {MigrationInterface, QueryRunner} from "typeorm";

export class FinalLayout1606673540127 implements MigrationInterface {
    name = 'FinalLayout1606673540127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_product" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "productId" integer, "cartId" integer, CONSTRAINT "REL_4f1b0c66f4e0b4610e14ca42e5" UNIQUE ("productId"), CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "total" character varying NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_fe3963d525b2ee03ba471953a7c" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "myusers" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "myusers" ADD CONSTRAINT "UQ_41b3a40c6ce00b6b690370fc7ae" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_abc0939a17fd68fcd10d1095224" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_99c39b067cfa73c783f0fc49a61" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_fe3963d525b2ee03ba471953a7c" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "myusers" ADD CONSTRAINT "FK_41b3a40c6ce00b6b690370fc7ae" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_139f8024067696fe5a8400ebda2" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_139f8024067696fe5a8400ebda2"`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c"`);
        await queryRunner.query(`ALTER TABLE "myusers" DROP CONSTRAINT "FK_41b3a40c6ce00b6b690370fc7ae"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_fe3963d525b2ee03ba471953a7c"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_99c39b067cfa73c783f0fc49a61"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_abc0939a17fd68fcd10d1095224"`);
        await queryRunner.query(`ALTER TABLE "myusers" DROP CONSTRAINT "UQ_41b3a40c6ce00b6b690370fc7ae"`);
        await queryRunner.query(`ALTER TABLE "myusers" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_fe3963d525b2ee03ba471953a7c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "cartId"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "cart_product"`);
    }

}
