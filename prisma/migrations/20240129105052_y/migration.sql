/*
  Warnings:

  - You are about to drop the column `created_at` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `finished` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `finished_at` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "created_at",
DROP COLUMN "finished",
DROP COLUMN "finished_at";
