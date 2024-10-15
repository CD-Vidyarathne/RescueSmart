import { Router } from "express";
import {
  addDisaster,
  getAllLocations,
} from "../controllers/locationController";

const router = Router();

router.get("/", getAllLocations);
router.post("/add", addDisaster);

export default router;
