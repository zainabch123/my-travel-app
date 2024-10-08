/*
  Warnings:

  - You are about to drop the `Trips` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trips" DROP CONSTRAINT "Trips_userId_fkey";

-- DropTable
DROP TABLE "Trips";
