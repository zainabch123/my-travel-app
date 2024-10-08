import prisma from "../utils/prisma.js";

const addNewTripDb = async (name, location, startDate, endDate, imgUrl, userId) => {
    console.log("userId", userId)
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

    console.log("user id in domain", userId)
    return await prisma.trips.findMany({
        where: {
            userId: userId
        }
    })

}

export { addNewTripDb, getUsersTripsDb };
