-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT IF EXISTS "Review_perfumeId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_perfumeId_key" ON "Review"("userId", "perfumeId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;