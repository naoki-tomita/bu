/*
  Warnings:

  - Added the required column `x` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL;
