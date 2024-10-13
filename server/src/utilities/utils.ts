import fs from "fs";
import csv from "csv-parser";

export function generatePrompt(p: string, l: string): string {
  const prompt = `30-50 word response on topic "${p}" : location - ${l} , Sri Lanka`;
  return prompt;
}

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

const readCitiesFromCSV = (): Promise<City[]> => {
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
        resolve(cities);
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
  const cities = await readCitiesFromCSV();
  let nearestCity: City | null = null;
  let minDistance = Infinity;

  for (const city of cities) {
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
