import { Router } from "express";
const router = Router();
import { addNewTrip, getUsersTrips } from "../controllers/trips.js";
import { verifyToken } from "../middleware/auth.js";

//Add a new trip:
router.post("/addTrip", verifyToken, addNewTrip);

//Get users trips:
router.get("/usersTrips", verifyToken, getUsersTrips);

export default router;