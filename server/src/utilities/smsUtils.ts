import { Contact, SafeLocation } from "../types/types";

export const generateSMSResponse = (
  safeLocations: SafeLocation[],
  contacts: Contact[],
): string => {
  let response = "Nearest Safe Locations:\n";

  safeLocations.forEach((location, index) => {
    response += `${index + 1}.${location.city} - ${location.location}\n`;
  });

  response += "\nEmergency Contacts:\n";

  contacts.forEach((contact, index) => {
    response += `${index + 1}. ${contact.contactName}: ${contact.phoneNumber}\n`;
  });

  return response;
};
