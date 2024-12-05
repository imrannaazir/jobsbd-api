/*
  Warnings:

  - You are about to drop the column `resume` on the `AppliedJob` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resumeId]` on the table `AppliedJob` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resumeId` to the `AppliedJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppliedJob" DROP COLUMN "resume",
ADD COLUMN     "resumeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AppliedJob_resumeId_key" ON "AppliedJob"("resumeId");

-- AddForeignKey
ALTER TABLE "AppliedJob" ADD CONSTRAINT "AppliedJob_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
