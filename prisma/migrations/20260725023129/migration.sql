/*
  Warnings:

  - You are about to drop the column `indifferent` on the `Feeling` table. All the data in the column will be lost.
  - You are about to drop the column `scarce` on the `Longevity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feeling" DROP COLUMN "indifferent";

-- AlterTable
ALTER TABLE "Longevity" DROP COLUMN "scarce";

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "autumn" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "spring" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Projection" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "soft" INTEGER NOT NULL DEFAULT 0,
    "moderate" INTEGER NOT NULL DEFAULT 0,
    "heavy" INTEGER NOT NULL DEFAULT 0,
    "huge" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Projection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "field" TEXT NOT NULL,

    CONSTRAINT "UserVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projection_perfumeId_key" ON "Projection"("perfumeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserVote_userId_perfumeId_category_key" ON "UserVote"("userId", "perfumeId", "category");

-- AddForeignKey
ALTER TABLE "Projection" ADD CONSTRAINT "Projection_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVote" ADD CONSTRAINT "UserVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVote" ADD CONSTRAINT "UserVote_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
