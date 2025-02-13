/*
  Warnings:

  - You are about to drop the column `postId` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Quiz_postId_key";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "postId";
