import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1721657014101 implements MigrationInterface {
    name = 'CreateTables1721657014101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "candidate" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "experience" character varying NOT NULL, "resume" character varying NOT NULL, "skill" text NOT NULL, CONSTRAINT "UQ_80e766f22573be71b86b2f05371" UNIQUE ("email"), CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "experience" character varying NOT NULL, "password" character varying NOT NULL, "position_id" integer, CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "position" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_opening" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "position_id" integer NOT NULL, "description" text NOT NULL, "skill" text NOT NULL, "location" character varying NOT NULL, "experience" character varying NOT NULL, "no_of_opening" integer NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_2fa80b3147363501d81b9f6bbf3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "referral" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "state" character varying NOT NULL, "accept_date" TIMESTAMP, "bonus_given" boolean NOT NULL, "employee_id" integer, "candidate_id" integer, "job_opening_id" integer, CONSTRAINT "PK_a2d3e935a6591168066defec5ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_notification" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "message" character varying NOT NULL, "employee_id" integer, CONSTRAINT "PK_4123ffa3739c135a12cea285964" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_6ab3ec557a640017d53ac0e0ab7" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_opening" ADD CONSTRAINT "FK_054a9e44c85d96b3028b91677aa" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "referral" ADD CONSTRAINT "FK_753fbab8e209904c57c6b529ed5" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "referral" ADD CONSTRAINT "FK_20140cddaf36fb9dd04f414fb09" FOREIGN KEY ("candidate_id") REFERENCES "candidate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "referral" ADD CONSTRAINT "FK_f05522f794021217d45113893a7" FOREIGN KEY ("job_opening_id") REFERENCES "job_opening"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_notification" ADD CONSTRAINT "FK_b9f57559b55e3abf6cb100ccc5e" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_notification" DROP CONSTRAINT "FK_b9f57559b55e3abf6cb100ccc5e"`);
        await queryRunner.query(`ALTER TABLE "referral" DROP CONSTRAINT "FK_f05522f794021217d45113893a7"`);
        await queryRunner.query(`ALTER TABLE "referral" DROP CONSTRAINT "FK_20140cddaf36fb9dd04f414fb09"`);
        await queryRunner.query(`ALTER TABLE "referral" DROP CONSTRAINT "FK_753fbab8e209904c57c6b529ed5"`);
        await queryRunner.query(`ALTER TABLE "job_opening" DROP CONSTRAINT "FK_054a9e44c85d96b3028b91677aa"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_6ab3ec557a640017d53ac0e0ab7"`);
        await queryRunner.query(`DROP TABLE "employee_notification"`);
        await queryRunner.query(`DROP TABLE "referral"`);
        await queryRunner.query(`DROP TABLE "job_opening"`);
        await queryRunner.query(`DROP TABLE "position"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "candidate"`);
    }

}
