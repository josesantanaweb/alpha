/*
  Warnings:

  - You are about to drop the `_PerfumeTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PerfumeTags" DROP CONSTRAINT "_PerfumeTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_PerfumeTags" DROP CONSTRAINT "_PerfumeTags_B_fkey";

-- AlterTable
ALTER TABLE "Decant" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "_PerfumeTags";

-- CreateTable
CREATE TABLE "_Tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Tags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Tags_B_index" ON "_Tags"("B");

-- AddForeignKey
ALTER TABLE "_Tags" ADD CONSTRAINT "_Tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Tags" ADD CONSTRAINT "_Tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
