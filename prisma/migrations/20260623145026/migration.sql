/*
  Warnings:

  - You are about to drop the column `noteName` on the `PerfumeNote` table. All the data in the column will be lost.
  - Added the required column `name` to the `PerfumeNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PerfumeNote" DROP COLUMN "noteName",
ADD COLUMN     "name" TEXT NOT NULL;
