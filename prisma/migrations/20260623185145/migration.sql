/*
  Warnings:

  - You are about to drop the `PerfumeLongevity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PerfumeLongevity" DROP CONSTRAINT "PerfumeLongevity_perfumeId_fkey";

-- DropTable
DROP TABLE "PerfumeLongevity";

-- CreateTable
CREATE TABLE "Longevity" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "scarce" INTEGER NOT NULL DEFAULT 0,
    "weak" INTEGER NOT NULL DEFAULT 0,
    "moderate" INTEGER NOT NULL DEFAULT 0,
    "long" INTEGER NOT NULL DEFAULT 0,
    "veryLong" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Longevity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Longevity_perfumeId_key" ON "Longevity"("perfumeId");

-- AddForeignKey
ALTER TABLE "Longevity" ADD CONSTRAINT "Longevity_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
