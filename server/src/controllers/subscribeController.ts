import { Request, Response } from "express";
import { subscribeUser } from "../services/subscribeService";

export const subscribe = async (req: Request, res: Response): Promise<void> => {
  const { number } = req.body;
  try {
    await subscribeUser(number);
    res.status(200).json({ success: true, message: "Subscribed" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Subscription failed" });
  }
};
