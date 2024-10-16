-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'RESTAURANT';

-- CreateTable
CREATE TABLE "TripItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "imgUrl" TEXT,
    "rating" DOUBLE PRECISION,
    "category" TEXT,
    "tripId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TripItem" ADD CONSTRAINT "TripItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
