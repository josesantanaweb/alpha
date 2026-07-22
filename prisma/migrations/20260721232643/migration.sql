/*
  Warnings:

  - You are about to drop the column `icon` on the `Accord` table. All the data in the column will be lost.
  - You are about to drop the column `autumn` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `night` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `spring` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the `_PerfumeAccords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PerfumeAccords" DROP CONSTRAINT "_PerfumeAccords_A_fkey";

-- DropForeignKey
ALTER TABLE "_PerfumeAccords" DROP CONSTRAINT "_PerfumeAccords_B_fkey";

-- AlterTable
ALTER TABLE "Accord" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "Season" DROP COLUMN "autumn",
DROP COLUMN "day",
DROP COLUMN "night",
DROP COLUMN "spring";

-- DropTable
DROP TABLE "_PerfumeAccords";

-- CreateTable
CREATE TABLE "TimeOfDay" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "day" INTEGER NOT NULL DEFAULT 0,
    "night" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TimeOfDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfumeAccord" (
    "perfumeId" TEXT NOT NULL,
    "accordId" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,

    CONSTRAINT "PerfumeAccord_pkey" PRIMARY KEY ("perfumeId","accordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeOfDay_perfumeId_key" ON "TimeOfDay"("perfumeId");

-- AddForeignKey
ALTER TABLE "TimeOfDay" ADD CONSTRAINT "TimeOfDay_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfumeAccord" ADD CONSTRAINT "PerfumeAccord_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfumeAccord" ADD CONSTRAINT "PerfumeAccord_accordId_fkey" FOREIGN KEY ("accordId") REFERENCES "Accord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
