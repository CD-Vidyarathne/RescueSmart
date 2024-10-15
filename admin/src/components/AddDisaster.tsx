import React, { useEffect, useState } from "react";
import axios from "../config/axiosClient";

const AddDisaster: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [disaster, setDisaster] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/locations"); // Adjust the endpoint as needed
        setCities(response.data); // Assuming the response is an array of city names
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleAddDisaster = async () => {
    try {
      await axios.post("/locations/add-disaster", {
        city: selectedCity,
        disaster: disaster,
      });
      console.log(`Added disaster to ${selectedCity}: ${disaster}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Add Disaster Situation</h2>
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="" disabled>
          Select a City
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        value={disaster}
        onChange={(e) => setDisaster(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="" disabled>
          Select Disaster Situation
        </option>
        <option value="Heavy Winds">Heavy Winds</option>
        <option value="Floods">Floods</option>
        <option value="Landslides">Landslides</option>
        <option value="Tsunami">Tsunami</option>
        <option value="Earthquakes">Earthquakes</option>
      </select>
      <div className="flex-grow" />
      <button
        onClick={handleAddDisaster}
        className="w-full bg-blue-600 mt-auto text-white p-2 rounded hover:bg-blue-700"
      >
        Add Disaster
      </button>
    </div>
  );
};

export default AddDisaster;
