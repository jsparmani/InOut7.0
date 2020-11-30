import {MigrationInterface, QueryRunner} from "typeorm";

export class afterResolvers1606717049834 implements MigrationInterface {
    name = 'afterResolvers1606717049834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "age" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."age" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "gender" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."gender" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."phone" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "profile"."phone" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."gender" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "gender" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."age" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "age" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "name" SET NOT NULL`);
    }

}
