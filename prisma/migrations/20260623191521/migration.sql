/*
  Warnings:

  - You are about to drop the `PerfumeSillage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PerfumeSillage" DROP CONSTRAINT "PerfumeSillage_perfumeId_fkey";

-- DropTable
DROP TABLE "PerfumeSillage";

-- CreateTable
CREATE TABLE "Sillage" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "soft" INTEGER NOT NULL DEFAULT 0,
    "moderate" INTEGER NOT NULL DEFAULT 0,
    "heavy" INTEGER NOT NULL DEFAULT 0,
    "huge" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Sillage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sillage_perfumeId_key" ON "Sillage"("perfumeId");

-- AddForeignKey
ALTER TABLE "Sillage" ADD CONSTRAINT "Sillage_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
