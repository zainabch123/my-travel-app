/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `Attractions` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `Hotels` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Attractions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "imageURL",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Attractions" DROP COLUMN "imageURL",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hotels" DROP COLUMN "imageURL",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
