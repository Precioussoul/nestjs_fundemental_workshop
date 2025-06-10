import { MigrationInterface, QueryRunner } from "typeorm";

export class CoffeeDesc1749579405309 implements MigrationInterface {
    name = 'CoffeeDesc1749579405309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }

}
