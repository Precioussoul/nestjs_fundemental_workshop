import { MigrationInterface, QueryRunner } from "typeorm";

export class CoffeeRefactor1749579349866 implements MigrationInterface {
    name = 'CoffeeRefactor1749579349866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }

}
