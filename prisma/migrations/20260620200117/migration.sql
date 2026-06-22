/*
  Warnings:

  - The values [HOMBRE,MUJER] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [SALIDA,CORAZON] on the enum `NoteStage` will be removed. If these variants are still used in the database, this will fail.
  - The values [ARABE,DISENADOR] on the enum `PerfumeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `debil` on the `PerfumeLongevity` table. All the data in the column will be lost.
  - You are about to drop the column `duradera` on the `PerfumeLongevity` table. All the data in the column will be lost.
  - You are about to drop the column `escasa` on the `PerfumeLongevity` table. All the data in the column will be lost.
  - You are about to drop the column `moderada` on the `PerfumeLongevity` table. All the data in the column will be lost.
  - You are about to drop the column `muyDuradera` on the `PerfumeLongevity` table. All the data in the column will be lost.
  - You are about to drop the column `enorme` on the `PerfumeSillage` table. All the data in the column will be lost.
  - You are about to drop the column `moderada` on the `PerfumeSillage` table. All the data in the column will be lost.
  - You are about to drop the column `pesada` on the `PerfumeSillage` table. All the data in the column will be lost.
  - You are about to drop the column `suave` on the `PerfumeSillage` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE', 'UNISEX');
ALTER TABLE "Perfume" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "public"."Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "NoteStage_new" AS ENUM ('TOP', 'HEART', 'BASE');
ALTER TABLE "PerfumeNote" ALTER COLUMN "stage" TYPE "NoteStage_new" USING ("stage"::text::"NoteStage_new");
ALTER TYPE "NoteStage" RENAME TO "NoteStage_old";
ALTER TYPE "NoteStage_new" RENAME TO "NoteStage";
DROP TYPE "public"."NoteStage_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PerfumeType_new" AS ENUM ('ARABIC', 'DESIGNER');
ALTER TABLE "Perfume" ALTER COLUMN "type" TYPE "PerfumeType_new" USING ("type"::text::"PerfumeType_new");
ALTER TYPE "PerfumeType" RENAME TO "PerfumeType_old";
ALTER TYPE "PerfumeType_new" RENAME TO "PerfumeType";
DROP TYPE "public"."PerfumeType_old";
COMMIT;

-- AlterTable
ALTER TABLE "PerfumeLongevity" DROP COLUMN "debil",
DROP COLUMN "duradera",
DROP COLUMN "escasa",
DROP COLUMN "moderada",
DROP COLUMN "muyDuradera",
ADD COLUMN     "long" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "moderate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scarce" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "veryLong" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "weak" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PerfumeSillage" DROP COLUMN "enorme",
DROP COLUMN "moderada",
DROP COLUMN "pesada",
DROP COLUMN "suave",
ADD COLUMN     "heavy" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "huge" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "moderate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "soft" INTEGER NOT NULL DEFAULT 0;
