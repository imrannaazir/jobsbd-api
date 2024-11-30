-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "description" TEXT,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "currentlyStudying" DROP NOT NULL;
