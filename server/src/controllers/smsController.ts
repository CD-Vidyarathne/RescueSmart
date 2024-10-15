import { Request, Response } from "express";
import {
  addSafeLocationToCSV,
  getDisastersFromCSV,
  getNearestCity,
  getNearestFiveSafeLocations,
} from "../utilities/locationUtils";
import { generatePrompt } from "../utilities/aiUtils";
import { generateResponse } from "../services/aiService";
import { sendSMSToAllUsers, sendSMSToUser } from "../services/smsService";
import { getLocationOfUser } from "../services/locationService";
import { SafeLocation, Contact } from "../types/types";
import { addContactToCSV, getContactsFromCSV } from "../utilities/contactUtils";
import { generateSMSResponse } from "../utilities/smsUtils";

export const receiveSMS = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { message, sender } = req.body;

  console.log("Received SMS: " + message + " from " + sender);

  if (!message || !sender) {
    console.log(message, sender);
    res.status(400).json({ success: false, message: "Invalid SMS" });
    return;
  }

  try {
    let smsResponse = "";
    const { lat, lng } = await getLocationOfUser(sender);
    let nearestCity = null;
    if (lat && lng) nearestCity = await getNearestCity(lat, lng);

    if (message.includes("SAFELOCATION")) {
      const loc = message.substr(message.indexOf(" ") + 1);
      const safeLocation: SafeLocation = {
        city: "",
        location: "",
        latitude: 0,
        longitude: 0,
      };
      if (nearestCity && loc && lat && lng) {
        safeLocation.city = nearestCity;
        safeLocation.location = loc;
        safeLocation.latitude = lat;
        safeLocation.longitude = lng;

        await addSafeLocationToCSV(safeLocation);
        smsResponse = "Location Saved. Thank you.";
      } else {
        console.log("Location Parameteres Wrong.");
        smsResponse =
          "Location Saving Error. Thank you. Please try again later.";
      }
    } else if (message.includes("HELPER")) {
      const name = message.substr(message.indexOf(" ") + 1);
      if (nearestCity && name && sender) {
        const contact: Contact = {
          city: nearestCity,
          contactName: name,
          phoneNumber: sender,
        };

        await addContactToCSV(contact);
        smsResponse = "Thank you for helping others.";
      } else {
        console.log("Contact Parameteres Wrong.");
        smsResponse = "Something went wrong. Please try again later.";
      }
    } else if (message.includes("NEARESTHELP")) {
      let nearestSafeLocations: SafeLocation[] = [];
      let contacts: Contact[] = [];
      if (lat && lng) {
        nearestSafeLocations = await getNearestFiveSafeLocations(lat, lng);
      }
      if (nearestCity) contacts = await getContactsFromCSV(nearestCity);
      smsResponse = generateSMSResponse(nearestSafeLocations, contacts);
    } else {
      const situation = await getDisastersFromCSV(nearestCity!);
      const prompt = generatePrompt(
        message,
        nearestCity ?? "Sri Lanka",
        situation?.join(","),
      );
      console.log(prompt);
      smsResponse = await generateResponse(prompt);
    }

    console.log(smsResponse);

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

export const sendSMSBroadcast = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ success: false, message: "Invalid SMS" });
    return;
  }

  try {
    await sendSMSToAllUsers(message);
    res.status(200).json({ success: true, message: "SMS Broadcasted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error sending the SMS Broadcast" });
  }
};
