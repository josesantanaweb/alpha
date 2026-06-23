/*
  Warnings:

  - You are about to drop the column `discountPercent` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `isTopSeller` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `priceDecant10ml` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `priceDecant5ml` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `priceFullBottle` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `remainingMlInTester` on the `Perfume` table. All the data in the column will be lost.
  - You are about to drop the column `stockFullBottles` on the `Perfume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Perfume" DROP COLUMN "discountPercent",
DROP COLUMN "isTopSeller",
DROP COLUMN "priceDecant10ml",
DROP COLUMN "priceDecant5ml",
DROP COLUMN "priceFullBottle",
DROP COLUMN "remainingMlInTester",
DROP COLUMN "stockFullBottles",
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "price" DECIMAL(10,2),
ADD COLUMN     "remainingMl" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Decant" (
    "id" TEXT NOT NULL,
    "ml" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "perfumeId" TEXT NOT NULL,

    CONSTRAINT "Decant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Decant_perfumeId_ml_key" ON "Decant"("perfumeId", "ml");

-- AddForeignKey
ALTER TABLE "Decant" ADD CONSTRAINT "Decant_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
