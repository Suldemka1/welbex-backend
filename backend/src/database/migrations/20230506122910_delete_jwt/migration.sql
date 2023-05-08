/*
  Warnings:

  - You are about to drop the column `jWTId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `JWT` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_jWTId_fkey";

-- DropIndex
DROP INDEX "User_jWTId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "jWTId";

-- DropTable
DROP TABLE "JWT";
