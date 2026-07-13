import { MigrationInterface, QueryRunner } from "typeorm";

export class SuppressionCinPatient1783922170682 implements MigrationInterface {
    name = 'SuppressionCinPatient1783922170682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "cin"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" ADD "cin" character varying`);
    }

}
