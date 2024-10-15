import fs from "fs";
import csv from "csv-parser";
import { City, SafeLocation } from "../types/types";

let cachedCities: City[] = [];

export const loadCitiesFromCSV = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const cities: City[] = [];
    fs.createReadStream("./resources/districts.csv")
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
    fs.createReadStream("./resources/safeLocations.csv")
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
): Promise<string[]> {
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

    // Get the names of the nearest five safe locations
    const nearestFive = sortedLocations
      .slice(0, 5)
      .map((location) => `${location.city} - ${location.location}`);
    return nearestFive;
  } catch (error) {
    console.error("Error fetching safe locations:", error);
    return [];
  }
}
