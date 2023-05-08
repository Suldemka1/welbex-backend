/*
  Warnings:

  - You are about to drop the column `jwtId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jWTId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_jwtId_fkey";

-- AlterTable
ALTER TABLE "JWT" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "jwtId",
ADD COLUMN     "jWTId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_jWTId_key" ON "User"("jWTId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jWTId_fkey" FOREIGN KEY ("jWTId") REFERENCES "JWT"("id") ON DELETE SET NULL ON UPDATE CASCADE;
