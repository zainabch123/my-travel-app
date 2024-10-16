import {
  addNewTripDb,
  getUsersTripsDb,
  addItemDb,
  getTripByIdDb,
} from "../domains/trips.js";

const addNewTrip = async (req, res) => {
  const { name, location, startDate, endDate, imgUrl } = req.body;
  const userId = req.user.id;

  if (!name || !location || !startDate || !endDate) {
    return res.status(400).json({
      error: "Name, Location, Start Date, and End Date are required.",
    });
  }

  try {
    const newTripData = {
      name,
      location,
      startDate: startDate === "" ? null : new Date(startDate),
      endDate: endDate === "" ? null : new Date(endDate),
      imgUrl: imgUrl === "" ? null : imgUrl,
    };

    if (newTripData.startDate > newTripData.endDate) {
      return res.status(400).json({
        error: "End date cannot be earlier than start date.",
      });
    }
    const newTrip = await addNewTripDb(newTripData, userId);
    return res.status(201).json({ trip: newTrip });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({ error: "Unable to add new trip" });
  }
};

const getUsersTrips = async (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!req.user.id === userId) {
    return res
      .status(403)
      .json({ error: "User not authorized to get this data." });
  }

  try {
    const usersTrips = await getUsersTripsDb(userId);

    return res.status(200).json({ trips: usersTrips || [] });
  } catch (e) {
    return res.status(500).json({ error: "Unable to get trips" });
  }
};

const getTripById = async (req, res) => {
  const tripId = Number(req.params.id);

  console.log("tripId", tripId)

  if (!tripId) {
    return res.status(400).json({ error: "Trip ID is required" });
  }
  try {
    console.log("second tripId", tripId);
    const foundTrip = await getTripByIdDb(tripId);

    if (!foundTrip) {
      return res.status(404).json({
        error: "Trip not found",
      });
    }
    return res.status(200).json({ trip: foundTrip });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({ error: "Unable to get trip" });
  }
};

const addItem = async (req, res) => {
  const tripId = Number(req.params.id);
  const { name, description, address, imgUrl, rating, category } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }

  try {
    const newItemData = {
      name,
      description: description === "" ? null : description,
      address: address === "" ? null : address,
      imgUrl: imgUrl === "" ? null : imgUrl,
      rating: rating === "" ? null : rating,
      category: category === "" ? null : category,
    };

    const newItem = await addItemDb(newItemData, tripId);
    return res.status(201).json({ item: newItem });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({ error: "Unable to add new trip" });
  }
};

export { addNewTrip, getUsersTrips, addItem, getTripById };
