/*
  Warnings:

  - The values [SHORTLISTED] on the enum `AppliedJobStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppliedJobStatus_new" AS ENUM ('APPLIED', 'SHORT_LISTED', 'REJECTED', 'ACCEPTED', 'HIRED');
ALTER TABLE "AppliedJob" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "AppliedJob" ALTER COLUMN "status" TYPE "AppliedJobStatus_new" USING ("status"::text::"AppliedJobStatus_new");
ALTER TYPE "AppliedJobStatus" RENAME TO "AppliedJobStatus_old";
ALTER TYPE "AppliedJobStatus_new" RENAME TO "AppliedJobStatus";
DROP TYPE "AppliedJobStatus_old";
ALTER TABLE "AppliedJob" ALTER COLUMN "status" SET DEFAULT 'APPLIED';
COMMIT;
