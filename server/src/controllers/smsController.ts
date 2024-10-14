import { Request, Response } from "express";
import { generatePrompt, getNearestCity } from "../utilities/utils";
import { generateResponse } from "../services/aiService";
import { sendSMSToUser } from "../services/smsService";
import { getLocationOfUser } from "../services/locationService";

export const receiveSMS = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { message, sender } = req.body;

  console.log("Received SMS: " + message + " from " + sender);

  if (!message || !sender) {
    res.status(400).json({ success: false, message: "Invalid SMS" });
    return;
  }

  try {
    let smsResponse = "Hello, World";

    if (message.includes("SAFELOCATION")) {
      const location = message.substr(message.indexOf(" ") + 1);
      console.log(location);
      // TODO: implement safe location saving
      smsResponse = "Location Saved. Thank you.";
    } else {
      const { lat, long } = await getLocationOfUser(sender);
      let nearestCity = null;
      if (lat && long) nearestCity = await getNearestCity(lat, long);
      const prompt = generatePrompt(message, nearestCity ?? "Sri Lanka");
      console.log(prompt);
      smsResponse = await generateResponse(prompt);
    }

    await sendSMSToUser(smsResponse, sender);

    res
      .status(200)
      .json({ success: true, message: "Response sent", smsResponse });
  } catch (error) {
    await sendSMSToUser("Service down. Please Try again later.", sender);
    res
      .status(500)
      .json({ success: false, message: "Error processing the SMS" });
  }
};

export const sendSMS = async (req: Request, res: Response) => {
  const { message, destination } = req.body;

  if (!message || !destination) {
    res.status(400).json({ success: false, message: "Invalid SMS" });
    return;
  }
  try {
    await sendSMSToUser(message, destination);
    res.status(200).json({ success: true, message: "SMS sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending the SMS" });
  }
};
