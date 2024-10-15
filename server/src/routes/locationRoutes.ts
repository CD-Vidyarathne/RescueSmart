import { Router } from "express";
import {
  addDisaster,
  getAllLocations,
  getAllDisasters,
  removeDisaster,
} from "../controllers/locationController";

const router = Router();

router.get("/", getAllLocations);
router.post("/add-disaster", addDisaster);
router.get("/current-disasters", getAllDisasters);
router.post("/remove-disaster", removeDisaster);

export default router;
