export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface SafeLocation {
  city: string;
  location: string;
  latitude: number;
  longitude: number;
}

export interface Contact {
  city: string;
  contactName: string;
  phoneNumber: string;
}
