-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_addressId_fkey";

-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
