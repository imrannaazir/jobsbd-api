/*
  Warnings:

  - You are about to drop the column `addressId` on the `Candidate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidateId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[experienceId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_locationId_fkey";

-- DropIndex
DROP INDEX "Candidate_addressId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "candidateId" TEXT,
ADD COLUMN     "experienceId" TEXT;

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "Address_candidateId_key" ON "Address"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_experienceId_key" ON "Address"("experienceId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE;
