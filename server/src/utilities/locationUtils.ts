import fs from "fs";
import csv from "csv-parser";
import { City, SafeLocation } from "../types/types";
import path from "path";

const CITIES_PATH = path.resolve(__dirname, "../../resources/districts.csv");
const SAFE_LOCATIONS_PATH = path.resolve(
  __dirname,
  "../../resources/safeLocations.csv",
);

const DISASTER_PATH = path.resolve(__dirname, "../../resources/disasters.csv");

let cachedCities: City[] = [];

export const loadCitiesFromCSV = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cities: City[] = [];
    fs.createReadStream(CITIES_PATH)
      .pipe(csv())
      .on("data", (row) => {
        cities.push({
          name: row.name,
          latitude: parseFloat(row.lat),
          longitude: parseFloat(row.lng),
        });
      })
      .on("end", () => {
        cachedCities = cities; // Cache cities data
        console.log("Cities loaded and cached");
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const readSafeLocationsFromCSV = (): Promise<SafeLocation[]> => {
  return new Promise((resolve, reject) => {
    const safeLocations: SafeLocation[] = [];
    fs.createReadStream(SAFE_LOCATIONS_PATH)
      .pipe(csv())
      .on("data", (row) => {
        safeLocations.push({
          city: row.city,
          location: row.safelocation,
          latitude: parseFloat(row.lat),
          longitude: parseFloat(row.lng),
        });
      })
      .on("end", () => {
        resolve(safeLocations);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export const addSafeLocationToCSV = async (
  location: SafeLocation,
): Promise<void> => {
  const csvString = `${location.city},${location.location},${location.latitude},${location.longitude}\n`;

  try {
    fs.appendFileSync(SAFE_LOCATIONS_PATH, csvString, "utf8");

    console.log(
      `Successfully added ${location.location} in ${location.city} to the CSV.`,
    );
  } catch (error) {
    console.error("Error adding safe location to CSV:", error);
  }
};

export const addDisasterToCSV = async (disaster: any): Promise<void> => {
  const csvString = `${disaster.city},${disaster.disaster}\n`;

  try {
    fs.appendFileSync(DISASTER_PATH, csvString, "utf8");

    console.log(`Successfully added the disaster to the CSV.`);
  } catch (error) {
    console.error("Error adding safe location to CSV:", error);
  }
};

export const getDisastersFromCSV = async (city: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const disasters: string[] = [];
    fs.createReadStream(DISASTER_PATH)
      .pipe(csv())
      .on("data", (row) => {
        if (row.city === city) {
          disasters.push(row.disaster);
        }
      })
      .on("end", () => {
        resolve(disasters);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const havTheta =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const d = 2 * R * Math.asin(Math.sqrt(havTheta));
  return d;
};

export async function getNearestCity(
  userLat: number,
  userLong: number,
): Promise<string> {
  let nearestCity: City | null = null;
  let minDistance = Infinity;

  for (const city of cachedCities) {
    const distance = haversineDistance(
      userLat,
      userLong,
      city.latitude,
      city.longitude,
    );
    if (distance < minDistance) {
      nearestCity = city;
      minDistance = distance;
    }
  }
  return nearestCity ? nearestCity.name : "Sri Lanka";
}

export async function getNearestFiveSafeLocations(
  userLat: number,
  userLong: number,
): Promise<SafeLocation[]> {
  try {
    const safeLocations = await readSafeLocationsFromCSV();
    const locationsWithDistance = safeLocations.map((location) => ({
      ...location,
      distance: haversineDistance(
        userLat,
        userLong,
        location.latitude,
        location.longitude,
      ),
    }));
    const sortedLocations = locationsWithDistance.sort(
      (a, b) => a.distance - b.distance,
    );

    const nearestFive = sortedLocations
      .slice(0, 5)
      .map((location): SafeLocation => {
        return {
          location: location.location,
          city: location.city,
          latitude: location.latitude,
          longitude: location.longitude,
        };
      });
    return nearestFive;
  } catch (error) {
    console.error("Error fetching safe locations:", error);
    return [];
  }
}

export function getAllCities(): City[] {
  return cachedCities;
}
