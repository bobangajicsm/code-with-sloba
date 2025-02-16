/*
  Warnings:

  - You are about to drop the column `code` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `UserProgress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sandboxUrl` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "sandboxTemplate" AS ENUM ('astro', 'viteSvelteTs', 'viteSvelte', 'viteVueTs', 'viteVue', 'vitePreactTs', 'vitePreact', 'viteReactTs', 'viteReact', 'vite', 'nextjs', 'node', 'vueTs', 'vue', 'vanilla', 'vanillaTs', 'testTs', 'svelte', 'solid', 'reactTs', 'react', 'angular', 'static');

-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "code",
ADD COLUMN     "sandboxTemplate" "sandboxTemplate",
ADD COLUMN     "sandboxUrl" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileUrl" TEXT;

-- DropTable
DROP TABLE "UserProgress";
