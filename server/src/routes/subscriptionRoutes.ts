import { Router } from "express";
import { subscribe } from "../controllers/subscribeController";

const router = Router();

router.post("/do", subscribe);

export default router;
