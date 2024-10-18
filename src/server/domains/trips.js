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
        },
        include: {
          tripItems: true
        }
    })

};

const getTripByIdDb = async (tripId) => {
  return await prisma.trips.findUnique({
    where: {
      id: tripId,
    },
    include: {
      tripItems: true
    }
  });
};

const addItemDb = async (newItemData, tripId) => {
  const { name, description, address, imgUrl, rating, category } = newItemData;

  return await prisma.tripItem.create({
    data: {
      name,
      description,
      address,
      imgUrl,
      rating,
      category,
      tripId
    },
  });
}

export { addNewTripDb, getUsersTripsDb, addItemDb, getTripByIdDb };
