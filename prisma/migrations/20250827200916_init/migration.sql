/*
  Warnings:

  - Added the required column `title` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Request" ADD COLUMN     "title" TEXT NOT NULL;
