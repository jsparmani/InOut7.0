import {MigrationInterface, QueryRunner} from "typeorm";

export class StoreUserProducts1606660141418 implements MigrationInterface {
    name = 'StoreUserProducts1606660141418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_admins_myusers" ("storeId" integer NOT NULL, "myusersId" integer NOT NULL, CONSTRAINT "PK_b7f4d7e79b2468ab7bb9f3ad536" PRIMARY KEY ("storeId", "myusersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2647ecf1ee83f710ef70963b3b" ON "store_admins_myusers" ("storeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_06af4ffedc7613e8c80ed5cfe8" ON "store_admins_myusers" ("myusersId") `);
        await queryRunner.query(`CREATE TABLE "store_subscribers_myusers" ("storeId" integer NOT NULL, "myusersId" integer NOT NULL, CONSTRAINT "PK_164b9263f1bdc08c9f1c0be9ce2" PRIMARY KEY ("storeId", "myusersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b6f876818a9d153fdd2e614622" ON "store_subscribers_myusers" ("storeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ea614b3316168ca3572e26b72" ON "store_subscribers_myusers" ("myusersId") `);
        await queryRunner.query(`ALTER TABLE "address" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD "storeId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "availableQty" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d037a6704e2acea2438d9ab218b" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_32eaa54ad96b26459158464379a" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_admins_myusers" ADD CONSTRAINT "FK_2647ecf1ee83f710ef70963b3ba" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_admins_myusers" ADD CONSTRAINT "FK_06af4ffedc7613e8c80ed5cfe81" FOREIGN KEY ("myusersId") REFERENCES "myusers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_subscribers_myusers" ADD CONSTRAINT "FK_b6f876818a9d153fdd2e614622d" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_subscribers_myusers" ADD CONSTRAINT "FK_4ea614b3316168ca3572e26b726" FOREIGN KEY ("myusersId") REFERENCES "myusers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_subscribers_myusers" DROP CONSTRAINT "FK_4ea614b3316168ca3572e26b726"`);
        await queryRunner.query(`ALTER TABLE "store_subscribers_myusers" DROP CONSTRAINT "FK_b6f876818a9d153fdd2e614622d"`);
        await queryRunner.query(`ALTER TABLE "store_admins_myusers" DROP CONSTRAINT "FK_06af4ffedc7613e8c80ed5cfe81"`);
        await queryRunner.query(`ALTER TABLE "store_admins_myusers" DROP CONSTRAINT "FK_2647ecf1ee83f710ef70963b3ba"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_32eaa54ad96b26459158464379a"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d037a6704e2acea2438d9ab218b"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "availableQty" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "profileId"`);
        await queryRunner.query(`DROP INDEX "IDX_4ea614b3316168ca3572e26b72"`);
        await queryRunner.query(`DROP INDEX "IDX_b6f876818a9d153fdd2e614622"`);
        await queryRunner.query(`DROP TABLE "store_subscribers_myusers"`);
        await queryRunner.query(`DROP INDEX "IDX_06af4ffedc7613e8c80ed5cfe8"`);
        await queryRunner.query(`DROP INDEX "IDX_2647ecf1ee83f710ef70963b3b"`);
        await queryRunner.query(`DROP TABLE "store_admins_myusers"`);
        await queryRunner.query(`DROP TABLE "store"`);
    }

}
