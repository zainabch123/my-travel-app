import { addNewTripDb, getUsersTripsDb } from "../domains/trips.js";

const addNewTrip = async (req, res) => {
  const { name, location, startDate, endDate, imgUrl } = req.body;
  const userId = req.user.id;

  if (!name || !location || !startDate || !endDate ) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const newTripData = {
      name,
      location,
      startDate: startDate === "" ? null : new Date(startDate),
      endDate: endDate === "" ? null: new Date(endDate),
      imgUrl: imgUrl === "" ? null : imgUrl
    };
 

    if (newTripData.startDate > newTripData.endDate) {
      return res.status(400).json({
        error: "End date cannot be earlier than start date.",
      });
    }
    const newTrip = await addNewTripDb(
      newTripData,
      userId
    );
    return res.status(201).json({ trip: newTrip });
  } catch (e) {
    console.log("error", e)
    return res.status(500).json({ error: "Unable to add new trip" });
  }
};

const getUsersTrips = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const usersTrips = await getUsersTripsDb(userId);

    if (!usersTrips || usersTrips.length === 0) {
      return res.status(404).json({ error: "No trips found for this user" });
    }

    return res.status(200).json({ trips: usersTrips });
  } catch (e) {
    return res.status(500).json({ error: "Unable to get trips" });
  }
};

export { addNewTrip, getUsersTrips };
