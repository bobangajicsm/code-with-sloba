/*
  Warnings:

  - You are about to drop the column `quizId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_quizId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "quizId";

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "optionC" DROP NOT NULL,
ALTER COLUMN "optionD" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PostQuiz" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "PostQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostQuiz_postId_quizId_key" ON "PostQuiz"("postId", "quizId");

-- AddForeignKey
ALTER TABLE "PostQuiz" ADD CONSTRAINT "PostQuiz_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostQuiz" ADD CONSTRAINT "PostQuiz_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
