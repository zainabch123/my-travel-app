import { Router } from "express";
const router = Router();
import {
  addNewTrip,
  getUsersTrips,
  addItem,
  getTripById,
} from "../controllers/trips.js";
import { verifyToken } from "../middleware/auth.js";

//Add a new trip:
router.post("/addTrip", verifyToken, addNewTrip);

//Get users trips:
router.get("/:id", verifyToken, getUsersTrips);

//Get specific trip:
router.get("/view/:id", verifyToken, getTripById);

//Add item to trip:
router.post("/:id/addItem", verifyToken, addItem)

export default router;