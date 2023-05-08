/*
  Warnings:

  - The primary key for the `JWT` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `JWT` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "JWT" DROP CONSTRAINT "JWT_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "JWT_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT,
ADD COLUMN     "jwtId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jwtId_fkey" FOREIGN KEY ("jwtId") REFERENCES "JWT"("id") ON DELETE SET NULL ON UPDATE CASCADE;
