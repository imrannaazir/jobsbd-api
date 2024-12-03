-- CreateEnum
CREATE TYPE "AppliedJobStatus" AS ENUM ('APPLIED', 'SHORTLISTED', 'REJECTED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "AppliedJob" (
    "id" TEXT NOT NULL,
    "status" "AppliedJobStatus" NOT NULL DEFAULT 'APPLIED',
    "candidateId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppliedJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppliedJob_id_key" ON "AppliedJob"("id");

-- AddForeignKey
ALTER TABLE "AppliedJob" ADD CONSTRAINT "AppliedJob_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedJob" ADD CONSTRAINT "AppliedJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedJob" ADD CONSTRAINT "AppliedJob_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
