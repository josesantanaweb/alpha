/*
  Warnings:

  - You are about to drop the `PerfumeNote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PerfumeNote" DROP CONSTRAINT "PerfumeNote_perfumeId_fkey";

-- DropTable
DROP TABLE "PerfumeNote";

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stage" "NoteStage" NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
