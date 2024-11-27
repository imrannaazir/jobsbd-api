/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_candidateId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "jobId" TEXT;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "businessType" TEXT,
ADD COLUMN     "companyDetails" TEXT,
ADD COLUMN     "foundedDate" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "numberOfEmployees" INTEGER,
ADD COLUMN     "numberOfOffices" INTEGER,
ADD COLUMN     "websiteLink" TEXT;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "jobId" TEXT,
ALTER COLUMN "candidateId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "vacancy" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "minSalary" DOUBLE PRECISION NOT NULL,
    "maxSalary" DOUBLE PRECISION NOT NULL,
    "experienceInMonths" INTEGER,
    "jobType" "EMPLOYMENT_TYPE" NOT NULL,
    "minAge" INTEGER,
    "jobDescription" TEXT,
    "jobRequirements" TEXT,
    "degreeName" TEXT NOT NULL,
    "degreeTitle" TEXT NOT NULL,
    "compensationBenefits" TEXT,
    "negotiable" BOOLEAN NOT NULL,
    "industryId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_id_key" ON "Job"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Job_industryId_key" ON "Job"("industryId");

-- CreateIndex
CREATE UNIQUE INDEX "Job_departmentId_key" ON "Job"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_companyId_key" ON "Address"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_jobId_key" ON "Address"("jobId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
