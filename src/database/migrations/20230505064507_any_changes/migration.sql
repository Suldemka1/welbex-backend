/*
  Warnings:

  - Added the required column `filename` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Media` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "filename" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "MediaType";
