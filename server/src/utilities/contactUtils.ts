import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { Contact } from "../types/types";
import csvParser from "csv-parser";

const CONTACTS_PATH = path.resolve(__dirname, "../../resources/contacts.csv");

const readContactsFromCSV = async (city: string): Promise<Contact[]> => {
  const contacts: Contact[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(CONTACTS_PATH)
      .pipe(csvParser())
      .on("data", (row) => {
        if (row.city.toLowerCase() === city.toLowerCase()) {
          contacts.push({
            city: row.city,
            contactName: row.contactName,
            phoneNumber: row.phoneNumber,
          });
        }
      })
      .on("end", () => {
        resolve(contacts);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export const addContactToCSV = async (contact: Contact): Promise<void> => {
  const csvString = `${contact.city},${contact.contactName},${contact.phoneNumber}\n`;

  try {
    fs.appendFileSync(CONTACTS_PATH, csvString, "utf8");

    console.log(
      `Successfully added ${contact.contactName} in ${contact.city} to the CSV.`,
    );
  } catch (error) {
    console.error("Error adding contact to CSV:", error);
  }
};

export const getContactsFromCSV = async (city: string): Promise<Contact[]> => {
  try {
    const contacts: Contact[] = await readContactsFromCSV(city);
    return contacts;
  } catch (error) {
    console.error("Error reading contacts from CSV:", error);
    return [];
  }
};
