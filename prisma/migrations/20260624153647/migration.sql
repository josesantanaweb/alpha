/*
  Warnings:

  - Made the column `price` on table `Perfume` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Perfume" ADD COLUMN     "rating" DECIMAL(3,2) NOT NULL DEFAULT 0.0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "price" SET NOT NULL;

-- CreateTable
CREATE TABLE "Feeling" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "love" INTEGER NOT NULL DEFAULT 0,
    "like" INTEGER NOT NULL DEFAULT 0,
    "indifferent" INTEGER NOT NULL DEFAULT 0,
    "dislike" INTEGER NOT NULL DEFAULT 0,
    "hate" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Feeling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "winter" INTEGER NOT NULL DEFAULT 0,
    "spring" INTEGER NOT NULL DEFAULT 0,
    "summer" INTEGER NOT NULL DEFAULT 0,
    "autumn" INTEGER NOT NULL DEFAULT 0,
    "day" INTEGER NOT NULL DEFAULT 0,
    "night" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feeling_perfumeId_key" ON "Feeling"("perfumeId");

-- CreateIndex
CREATE UNIQUE INDEX "Season_perfumeId_key" ON "Season"("perfumeId");

-- AddForeignKey
ALTER TABLE "Feeling" ADD CONSTRAINT "Feeling_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
