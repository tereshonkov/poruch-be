/*
  Warnings:

  - Added the required column `city` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "public"."Request" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "priority" "public"."Priority" NOT NULL DEFAULT 'HIGH';
