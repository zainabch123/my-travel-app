import prisma from "../utils/prisma.js";

const addNewTripDb = async (newTripData, userId) => {
  const {name,
      location,
      startDate,
      endDate,
      imgUrl} = newTripData

  return await prisma.trips.create({
    data: {
      name,
      location,
      startDate,
      endDate,
      imgUrl,
      userId,
    },
  });
};

const getUsersTripsDb = async (userId) => {
    return await prisma.trips.findMany({
        where: {
            userId: userId
        }
    })

}

export { addNewTripDb, getUsersTripsDb };
