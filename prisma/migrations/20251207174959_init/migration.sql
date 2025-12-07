/*
  Warnings:

  - You are about to drop the column `userId` on the `Shader` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shader" DROP CONSTRAINT "Shader_userId_fkey";

-- AlterTable
ALTER TABLE "Shader" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";
