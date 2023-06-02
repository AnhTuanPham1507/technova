import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1685704866415 implements MigrationInterface {
    name = 'Migrations1685704866415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "title" character varying(20) NOT NULL, "news_id" uuid, CONSTRAINT "PK_4bfb7a2237cf6b334cbb7ea1341" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."news_type_enum" AS ENUM('recruitment', 'introductory')`);
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "title" character varying(50) NOT NULL, "content" text NOT NULL, "type" "public"."news_type_enum" NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."react_type_enum" AS ENUM('like')`);
        await queryRunner.query(`CREATE TABLE "react" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "type" "public"."react_type_enum" NOT NULL, "author_id" uuid, "news_id" uuid, CONSTRAINT "PK_6ee31cceec7615f2d469fa8ba71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(20) NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(20) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."discount_status_enum" AS ENUM('activate', 'de_activate')`);
        await queryRunner.query(`CREATE TABLE "discount" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "percent" double precision NOT NULL, "status" "public"."discount_status_enum" NOT NULL, "expired_date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(50) NOT NULL, "account_id" uuid, CONSTRAINT "REL_f92b141ca4b0ca2defc719674c" UNIQUE ("account_id"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "phone" character varying(15) NOT NULL, "account_id" uuid, CONSTRAINT "REL_6acfec7285fdf9f463462de3e9" UNIQUE ("account_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_type_enum" AS ENUM('online', 'office')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "momo_id" character varying NOT NULL, "type" "public"."payment_type_enum" NOT NULL, "order_id" uuid, CONSTRAINT "REL_f5221735ace059250daac9d980" UNIQUE ("order_id"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('pending', 'accepted', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "total_price" double precision NOT NULL, "receipted_date" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "public"."order_status_enum" NOT NULL, "is_paid" boolean NOT NULL, "user_id" uuid, "employee_id" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "price" double precision NOT NULL, "quantity" double precision NOT NULL, "product_package_id" uuid, "order_id" uuid, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_package_currency_enum" AS ENUM('vnd', 'usd')`);
        await queryRunner.query(`CREATE TABLE "product_package" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "price" double precision NOT NULL, "currency" "public"."product_package_currency_enum" NOT NULL, "time_range" TIMESTAMP WITH TIME ZONE NOT NULL, "in_stock_quantity" integer NOT NULL, "product_id" uuid, CONSTRAINT "PK_9aa2fdb52cc05da3d96ac6cbc2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_benefit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(100) NOT NULL, "product_id" uuid, CONSTRAINT "PK_19ead717c6f3e0e54194595cd79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(10) NOT NULL, "product_id" uuid, CONSTRAINT "PK_1439455c6528caa94fcc8564fda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "star" double precision NOT NULL, "content" text NOT NULL, "product_id" uuid, "author_id" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(20) NOT NULL, "description" text NOT NULL, "brand_id" uuid, "category_id" uuid, "discount_id" uuid, CONSTRAINT "REL_8cfd00cd6b9904ee7c5a45ffb3" UNIQUE ("discount_id"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "content" text NOT NULL, "product_id" uuid, "author_id" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "account_id" uuid, CONSTRAINT "REL_549a26f8a691cec95c57a036b4" UNIQUE ("account_id"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(20) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(20) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "username" character varying(50) NOT NULL, "password" character varying NOT NULL, "role_id" uuid, CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "name" character varying(20) NOT NULL, CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriber" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "email" character varying(50) NOT NULL, CONSTRAINT "PK_1c52b7ddbaf79cd2650045b79c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."image_object_type_enum" AS ENUM('banner', 'product', 'brand', 'NEWS')`);
        await queryRunner.query(`CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" character varying NOT NULL, "updated_by" character varying NOT NULL, "deleted_by" character varying, "type" character varying NOT NULL, "path" character varying NOT NULL, "object_id" character varying NOT NULL, "object_type" "public"."image_object_type_enum" NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_benefit_packages_product_package" ("product_benefit_id" uuid NOT NULL, "product_package_id" uuid NOT NULL, CONSTRAINT "PK_668d4eddeeefd300968fe9dcd7d" PRIMARY KEY ("product_benefit_id", "product_package_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_480fcd982e0b87badea1a00c96" ON "product_benefit_packages_product_package" ("product_benefit_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e6f16e13b8162c3e201dab8e9c" ON "product_benefit_packages_product_package" ("product_package_id") `);
        await queryRunner.query(`CREATE TABLE "permission_role_role" ("permission_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_31b8f5a0606c1be346c5eaed432" PRIMARY KEY ("permission_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59053f4334b3f52ca139dd666c" ON "permission_role_role" ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5c4f7418159122adf52d178d00" ON "permission_role_role" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "news_tag" ADD CONSTRAINT "FK_2901c81f23af122e0535f8e075c" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "react" ADD CONSTRAINT "FK_894421404d63d77ed54d1428461" FOREIGN KEY ("author_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "react" ADD CONSTRAINT "FK_d722e2e35eec6cfdc807e0d2631" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f92b141ca4b0ca2defc719674cc" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_f5221735ace059250daac9d9803" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_08cafdcbae0d6407effc99cf7aa" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_b8aef8dcdeb33ac9a26a27eaf4c" FOREIGN KEY ("product_package_id") REFERENCES "product_package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_package" ADD CONSTRAINT "FK_90b0b38ddd3c61130785d3fae43" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_benefit" ADD CONSTRAINT "FK_66e7c242abfbd2bc9d241d68ad2" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_tag" ADD CONSTRAINT "FK_d08cb260c60a9bf0a5e0424768d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_244f8127a8ed4eb8ae63d0790d2" FOREIGN KEY ("author_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_8cfd00cd6b9904ee7c5a45ffb3f" FOREIGN KEY ("discount_id") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_66a8816397e580b819e78d974dd" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_549a26f8a691cec95c57a036b48" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_d3890c96feefc95c7cfd788cfda" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_benefit_packages_product_package" ADD CONSTRAINT "FK_480fcd982e0b87badea1a00c96a" FOREIGN KEY ("product_benefit_id") REFERENCES "product_benefit"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_benefit_packages_product_package" ADD CONSTRAINT "FK_e6f16e13b8162c3e201dab8e9c5" FOREIGN KEY ("product_package_id") REFERENCES "product_package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_role_role" ADD CONSTRAINT "FK_59053f4334b3f52ca139dd666c4" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_role_role" ADD CONSTRAINT "FK_5c4f7418159122adf52d178d004" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_role_role" DROP CONSTRAINT "FK_5c4f7418159122adf52d178d004"`);
        await queryRunner.query(`ALTER TABLE "permission_role_role" DROP CONSTRAINT "FK_59053f4334b3f52ca139dd666c4"`);
        await queryRunner.query(`ALTER TABLE "product_benefit_packages_product_package" DROP CONSTRAINT "FK_e6f16e13b8162c3e201dab8e9c5"`);
        await queryRunner.query(`ALTER TABLE "product_benefit_packages_product_package" DROP CONSTRAINT "FK_480fcd982e0b87badea1a00c96a"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_d3890c96feefc95c7cfd788cfda"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_549a26f8a691cec95c57a036b48"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_3ce66469b26697baa097f8da923"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_66a8816397e580b819e78d974dd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_8cfd00cd6b9904ee7c5a45ffb3f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_2eb5ce4324613b4b457c364f4a2"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_244f8127a8ed4eb8ae63d0790d2"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_26b533e15b5f2334c96339a1f08"`);
        await queryRunner.query(`ALTER TABLE "product_tag" DROP CONSTRAINT "FK_d08cb260c60a9bf0a5e0424768d"`);
        await queryRunner.query(`ALTER TABLE "product_benefit" DROP CONSTRAINT "FK_66e7c242abfbd2bc9d241d68ad2"`);
        await queryRunner.query(`ALTER TABLE "product_package" DROP CONSTRAINT "FK_90b0b38ddd3c61130785d3fae43"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_b8aef8dcdeb33ac9a26a27eaf4c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_08cafdcbae0d6407effc99cf7aa"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_f5221735ace059250daac9d9803"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f92b141ca4b0ca2defc719674cc"`);
        await queryRunner.query(`ALTER TABLE "react" DROP CONSTRAINT "FK_d722e2e35eec6cfdc807e0d2631"`);
        await queryRunner.query(`ALTER TABLE "react" DROP CONSTRAINT "FK_894421404d63d77ed54d1428461"`);
        await queryRunner.query(`ALTER TABLE "news_tag" DROP CONSTRAINT "FK_2901c81f23af122e0535f8e075c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c4f7418159122adf52d178d00"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59053f4334b3f52ca139dd666c"`);
        await queryRunner.query(`DROP TABLE "permission_role_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6f16e13b8162c3e201dab8e9c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_480fcd982e0b87badea1a00c96"`);
        await queryRunner.query(`DROP TABLE "product_benefit_packages_product_package"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TYPE "public"."image_object_type_enum"`);
        await queryRunner.query(`DROP TABLE "subscriber"`);
        await queryRunner.query(`DROP TABLE "partner"`);
        await queryRunner.query(`DROP TABLE "banner"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "product_tag"`);
        await queryRunner.query(`DROP TABLE "product_benefit"`);
        await queryRunner.query(`DROP TABLE "product_package"`);
        await queryRunner.query(`DROP TYPE "public"."product_package_currency_enum"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_type_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "discount"`);
        await queryRunner.query(`DROP TYPE "public"."discount_status_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "react"`);
        await queryRunner.query(`DROP TYPE "public"."react_type_enum"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TYPE "public"."news_type_enum"`);
        await queryRunner.query(`DROP TABLE "news_tag"`);
    }

}
