import { MigrationInterface, QueryRunner } from "typeorm";

export class AjoutLieuNaissanceAdressePatient1783686050757 implements MigrationInterface {
    name = 'AjoutLieuNaissanceAdressePatient1783686050757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" ADD "lieuNaissance" character varying`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "adresse" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "adresse"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "lieuNaissance"`);
    }

}
