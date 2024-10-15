import { Router } from "express";
import {
  receiveSMS,
  sendSMS,
  sendSMSBroadcast,
} from "../controllers/smsController";

const router = Router();

router.post("/receive", receiveSMS);
router.post("/send", sendSMS);
router.post("/send-all", sendSMSBroadcast);

export default router;
