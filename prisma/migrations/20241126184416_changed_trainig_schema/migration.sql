-- AlterTable
ALTER TABLE "Training" ALTER COLUMN "duration" SET DATA TYPE TEXT,
ALTER COLUMN "certificateUrl" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
