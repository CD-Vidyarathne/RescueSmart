import { Request, Response } from "express";
import { generatePrompt } from "../utilities/utils";
import { generateResponse } from "../services/aiService";
import { sendSMS } from "../services/smsService";

export const receiveSMS = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { message, sender } = req.body;

    console.log("Received SMS: " + message + " from " + sender);

    if (!message || !sender) {
      res.status(400).json({ success: false, message: "Invalid SMS" });
      return;
    }

    const prompt = generatePrompt(message);
    console.log(`Generated prompt: ${prompt}`);

    const aiResponse = await generateResponse(prompt);
    console.log(`AI response: ${aiResponse}`);

    await sendSMS(aiResponse, sender);

    res
      .status(200)
      .json({ success: true, message: "Response sent", aiResponse });
  } catch (error) {
    console.error("Error processing the SMS", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing the SMS" });
  }
};
