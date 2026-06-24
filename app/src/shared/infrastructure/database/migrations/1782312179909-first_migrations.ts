import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigrations1782312179909 implements MigrationInterface {
    name = 'FirstMigrations1782312179909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "members" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "penaltyUntil" TIMESTAMP, CONSTRAINT "UQ_8b08a36b59b238402b8c38d1f6f" UNIQUE ("code"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "borrow_records" ("id" SERIAL NOT NULL, "memberId" integer NOT NULL, "bookId" integer NOT NULL, "borrowDate" TIMESTAMP NOT NULL DEFAULT now(), "returnDate" TIMESTAMP, CONSTRAINT "PK_b403bf5f85354e7a86867585152" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "stock" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_c19328bbdf15e7ddbea3812318d" UNIQUE ("code"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borrow_records" ADD CONSTRAINT "FK_c67bf9bcfb801072dc414d0bb67" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrow_records" ADD CONSTRAINT "FK_c52344b2e6920513d0bdeeca111" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow_records" DROP CONSTRAINT "FK_c52344b2e6920513d0bdeeca111"`);
        await queryRunner.query(`ALTER TABLE "borrow_records" DROP CONSTRAINT "FK_c67bf9bcfb801072dc414d0bb67"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "borrow_records"`);
        await queryRunner.query(`DROP TABLE "members"`);
    }

}
