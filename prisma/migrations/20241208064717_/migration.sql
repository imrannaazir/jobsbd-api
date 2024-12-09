/*
  Warnings:

  - A unique constraint covering the columns `[language]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Language_language_key" ON "Language"("language");
