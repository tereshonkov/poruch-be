/*
  Warnings:

  - The `status` column on the `Request` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "public"."Request" DROP COLUMN "status",
ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "social" TEXT;
