-- CreateEnum
CREATE TYPE "PerfumeType" AS ENUM ('ARABE', 'DISENADOR');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('HOMBRE', 'MUJER', 'UNISEX');

-- CreateEnum
CREATE TYPE "NoteStage" AS ENUM ('SALIDA', 'CORAZON', 'BASE');

-- CreateTable
CREATE TABLE "Perfume" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designer" TEXT NOT NULL,
    "type" "PerfumeType" NOT NULL,
    "gender" "Gender" NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "priceFullBottle" DECIMAL(10,2) NOT NULL,
    "priceDecant5ml" DECIMAL(10,2) NOT NULL,
    "priceDecant10ml" DECIMAL(10,2) NOT NULL,
    "discountPercent" INTEGER NOT NULL DEFAULT 0,
    "isTopSeller" BOOLEAN NOT NULL DEFAULT false,
    "stockFullBottles" INTEGER NOT NULL DEFAULT 0,
    "remainingMlInTester" INTEGER NOT NULL DEFAULT 100,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perfume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfumeLongevity" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "escasa" INTEGER NOT NULL DEFAULT 0,
    "debil" INTEGER NOT NULL DEFAULT 0,
    "moderada" INTEGER NOT NULL DEFAULT 0,
    "duradera" INTEGER NOT NULL DEFAULT 0,
    "muyDuradera" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PerfumeLongevity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfumeSillage" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "suave" INTEGER NOT NULL DEFAULT 0,
    "moderada" INTEGER NOT NULL DEFAULT 0,
    "pesada" INTEGER NOT NULL DEFAULT 0,
    "enorme" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PerfumeSillage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfumeNote" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "noteName" TEXT NOT NULL,
    "stage" "NoteStage" NOT NULL,

    CONSTRAINT "PerfumeNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PerfumeLongevity_perfumeId_key" ON "PerfumeLongevity"("perfumeId");

-- CreateIndex
CREATE UNIQUE INDEX "PerfumeSillage_perfumeId_key" ON "PerfumeSillage"("perfumeId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Perfume" ADD CONSTRAINT "Perfume_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfumeLongevity" ADD CONSTRAINT "PerfumeLongevity_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfumeSillage" ADD CONSTRAINT "PerfumeSillage_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfumeNote" ADD CONSTRAINT "PerfumeNote_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_perfumeId_fkey" FOREIGN KEY ("perfumeId") REFERENCES "Perfume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
