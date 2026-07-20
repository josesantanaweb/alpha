/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Perfume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Perfume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Perfume" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Perfume_slug_key" ON "Perfume"("slug");
