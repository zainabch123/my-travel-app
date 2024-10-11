import { Router } from "express";
const router = Router();
import { getTravelData } from "../controllers/api.js";

//Get request to tripAdvisorAPI:
router.get("/search", getTravelData);

export default router;
