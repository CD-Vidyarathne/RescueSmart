import { Router } from "express";
import { receiveSMS } from "../controllers/smsController";

const router = Router();

router.post("/receive", receiveSMS);

export default router;
