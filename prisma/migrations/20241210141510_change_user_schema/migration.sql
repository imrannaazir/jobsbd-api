-- AlterEnum
ALTER TYPE "AppliedJobStatus" ADD VALUE 'HIRED';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
