import { addNewTripDb, getUsersTripsDb } from "../domains/trips.js";

const addNewTrip = async (req, res) => {
  const { name, location, startDate, endDate, imgUrl } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const newTrip = await addNewTripDb(
      name,
      location,
      startDate,
      endDate,
      imgUrl, 
      userId
    );
    return res.status(201).json({ trip: newTrip });
  } catch (e) {
    console.log("error", e)
    // return res.status(500).json({ Error: "Unable to add new trip" });
  }
};


const getUsersTrips = async (req, res) => {
    const userId = req.user.id;

    console.log("user", req.user)

    try {
        const usersTrips = await getUsersTripsDb(userId);

        return res.status(200).json({ trips: usersTrips });
    } catch (e) {
        console.log("error:", e)
    }
}


export { addNewTrip, getUsersTrips };
