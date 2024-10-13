import { Router } from "express";
import { receiveSMS, sendSMS } from "../controllers/smsController";

const router = Router();

router.post("/receive", receiveSMS);
router.post("/send", sendSMS);

export default router;
