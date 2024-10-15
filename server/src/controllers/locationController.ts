import { Request, Response } from "express";
import {
  addDisasterToCSV,
  deleteDisasterFromCSV,
  getAllCities,
  getAllDisastersFromCSV,
} from "../utilities/locationUtils";

export const getAllLocations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const allCities = getAllCities();
    const names = allCities.map((city) => city.name);
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ message: "Error fetching locations", error });
  }
};

export const addDisaster = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { city, disaster } = req.body;
  if (!city || !disaster) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }
  try {
    await addDisasterToCSV({ city, disaster });
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json({ message: "Error adding disaster", error });
  }
};

export const getAllDisasters = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const disasters = await getAllDisastersFromCSV();
    res.status(200).json(disasters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching disasters", error });
  }
};

export const removeDisaster = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { csvString } = req.body;
  try {
    await deleteDisasterFromCSV(csvString);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json({ message: "Error removing disaster", error });
  }
};
