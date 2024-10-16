/*
  Warnings:

  - You are about to drop the column `address` on the `TripItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TripItem" DROP COLUMN "address",
ALTER COLUMN "rating" SET DATA TYPE TEXT;
